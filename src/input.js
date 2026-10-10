// Contrôles : clic sur les zones de la scène pour choisir le mode, clavier pour agir
import { state, getLevel, acceptsInput } from './core/state.js';
import { clampGauge, workGain, isOverheated, isValidAlternation } from './core/rules.js';
import { emit } from './core/events.js';
import { togglePause } from './core/game.js';
import { renderBars, renderMode, renderNextArrow } from './ui/hud.js';
import { workEffect, coolEffect, missEffect } from './ui/effects.js';

// Touches du jeu : leur comportement par défaut (défilement...) est bloqué,
// les autres (F5, F12, Ctrl+R...) restent utilisables
const GAME_KEYS = ['Space', 'ArrowLeft', 'ArrowRight'];

function setMode(mode) {
    if (!acceptsInput()) return;

    state.mode = mode;
    if (mode === 'cool') state.lastArrow = null;  // Réinitialiser l'alternance
    renderMode();
    emit('mode-changed');
}

function work() {
    const level = getLevel();
    // En surchauffe, chaque appui rapporte moins : il vaut mieux refroidir d'abord
    const overheated = isOverheated(state.heat, level);
    const amount = workGain(state.heat, level);

    state.work = clampGauge(state.work + amount);
    renderBars();
    workEffect(amount, overheated);
    emit('action', 'work');
}

/** @param {'left'|'right'} arrow */
function cool(arrow) {
    if (!isValidAlternation(state.lastArrow, arrow)) {
        missEffect();
        return;
    }

    const amount = getLevel().fanCooling;
    state.lastArrow = arrow;
    state.heat = clampGauge(state.heat - amount);
    renderBars();
    renderNextArrow(arrow);
    coolEffect(amount, arrow);
    emit('action', 'cool');
}

function onKeyDown(event) {
    if (event.code === 'Escape') {
        event.preventDefault();
        togglePause();
        return;
    }

    if (!acceptsInput()) return;
    // Saisie dans un champ (fiche employé) : les touches servent au texte
    if (event.target.closest('input, textarea, select')) return;
    if (GAME_KEYS.includes(event.code)) event.preventDefault();

    if (state.mode === 'work' && event.code === 'Space') {
        // Ignorer la répétition automatique quand la touche est maintenue
        if (!event.repeat) work();
    } else if (state.mode === 'cool' && (event.code === 'ArrowLeft' || event.code === 'ArrowRight')) {
        cool(event.code === 'ArrowLeft' ? 'left' : 'right');
    }
}

export function initInput() {
    document.querySelectorAll('.bureau, .joueur, .computer').forEach(zone => {
        zone.addEventListener('click', () => setMode('work'));
    });
    document.querySelector('.handfan').addEventListener('click', () => setMode('cool'));

    // Cliquer ailleurs dans le décor : retour au repos (sauf clics dans les menus)
    document.querySelector('.background').addEventListener('click', event => {
        if (!event.target.closest('.sprite, .overlay')) setMode('idle');
    });

    document.addEventListener('keydown', onKeyDown);
}
