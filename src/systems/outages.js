// Coupures de courant : à heures fixes, l'ordinateur s'éteint et Espace ne rapporte plus rien.
// Le joueur ouvre le disjoncteur d'un clic, puis tape une combinaison de flèches pour relancer.
// Le reste continue : chaleur, éventail, téléphone et messages du patron.
import { state, getLevel, isTimeRunning } from '../core/state.js';
import { toMinutes, nextCodeProgress } from '../core/rules.js';
import { emit, on } from '../core/events.js';
import { renderMode } from '../ui/hud.js';
import { showFloatingText, playEffect } from '../ui/effects.js';
import { applyTranslations } from '../i18n/index.js';

const ARROWS = { ArrowUp: '↑', ArrowDown: '↓', ArrowLeft: '←', ArrowRight: '→' };

const els = {
    panel: document.getElementById('breaker'),
    code: document.getElementById('breakerCode'),
    computer: document.querySelector('.computer')
};

let triggered = 0;   // Coupures déjà survenues dans la journée
let code = [];       // Combinaison de la coupure en cours
let progress = 0;    // Flèches déjà justes
let open = false;    // Disjoncteur ouvert : les flèches servent au code

function getConfig() {
    return getLevel().outages;
}

/** Début de journée : courant rétabli, aucune coupure survenue */
export function startOutages() {
    triggered = 0;
    restorePower();
}

/** Journée terminée ou relancée */
export function stopOutages() {
    restorePower();
}

// Appelée à chaque tick : coupure à l'heure prévue
export function updateOutages() {
    const config = getConfig();
    if (!config || state.powerOut) return;
    if (triggered >= config.hours.length) return;
    if (toMinutes(state.hour, state.minute) < toMinutes(config.hours[triggered])) return;

    triggered++;
    cutPower(config.codeLength);
}

function cutPower(length) {
    const keys = Object.keys(ARROWS);
    code = Array.from({ length }, () => keys[Math.floor(Math.random() * keys.length)]);
    progress = 0;
    state.powerOut = true;

    applyTranslations(els.panel);
    setOpen(false);
    els.panel.classList.remove('hidden');
    document.body.classList.add('power-out');
    emit('power-changed');
}

function restorePower() {
    const wasOut = state.powerOut;
    state.powerOut = false;
    setOpen(false);
    els.panel.classList.add('hidden');
    document.body.classList.remove('power-out');
    if (wasOut) emit('power-changed');
}

function setOpen(value) {
    open = value;
    els.panel.classList.toggle('open', open);
    renderCode();
}

function renderCode() {
    els.code.replaceChildren(...code.map((key, index) => {
        const arrow = document.createElement('span');
        arrow.textContent = ARROWS[key];
        arrow.classList.toggle('done', index < progress);
        return arrow;
    }));
}

// Clic : ouvrir le disjoncteur. Le mode repos évite que les flèches ventilent en même temps.
els.panel.addEventListener('click', () => {
    if (!state.powerOut || open || !isTimeRunning()) return;
    state.mode = 'idle';
    renderMode();
    setOpen(true);
});

// Changer de mode (travail, éventail) referme le disjoncteur
on('mode-changed', () => {
    if (open && state.mode !== 'idle') setOpen(false);
});

document.addEventListener('keydown', event => {
    if (!open || !isTimeRunning() || !(event.code in ARROWS)) return;
    event.preventDefault();

    const next = nextCodeProgress(code, progress, event.code);
    if (next < progress + 1) playEffect(els.code, 'error');
    progress = next;

    if (progress < code.length) {
        renderCode();
        return;
    }
    restorePower();
    showFloatingText('⚡ OK', els.computer, 'gain');
});
