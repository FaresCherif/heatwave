// Tutoriel guidé : le temps reste figé (phase 'tutorial') tant qu'il est affiché.
// Chaque étape attend une action du joueur avant de passer à la suivante :
// - done : condition vérifiée à chaque changement de mode
// - action + count : nombre d'actions ('work' ou 'cool') à réaliser
// - button : étape validée par un bouton
import { state, getLevel } from '../core/state.js';
import { on } from '../core/events.js';
import { renderBars } from '../ui/hud.js';

const STEPS = [
    {
        text: 'Cliquez sur le personnage ou l\'ordinateur pour passer en <b>mode travail</b>.',
        target: '.joueur',
        done: () => state.mode === 'work'
    },
    {
        text: 'Appuyez sur <b>Espace</b> pour remplir la barre 💼 Travail. Elle baisse en continu : sous le trait blanc, votre <b>salaire du jour</b> 💰 diminue. À 0, vous êtes renvoyé !',
        target: '.work-bar-fill',
        action: 'work',
        count: 5
    },
    {
        text: 'La 🌡️ Chaleur monte toute la journée, encore plus vite après 12h. Cliquez sur l\'<b>éventail</b>.',
        target: '.handfan',
        done: () => state.mode === 'cool',
        onStart: () => { state.heat = 40; }  // Pour voir la chaleur baisser à l'étape suivante
    },
    {
        text: 'Alternez <b>←</b> et <b>→</b> pour vous rafraîchir. Appuyer deux fois sur la même flèche ne sert à rien !',
        target: '.heat-bar-fill',
        action: 'cool',
        count: 6
    },
    {
        text: () => `Au-delà du trait blanc, c'est la <b>surchauffe</b> : le travail rapporte moitié moins. À 100 %, c'est fini.<br>Tenez jusqu'à <b>${getLevel().endHour}h</b> ! (Échap = pause)`,
        target: '.heat-threshold',
        button: 'C\'EST PARTI'
    }
];

const els = {
    panel: document.getElementById('tutorial'),
    step: document.getElementById('tutorialStep'),
    text: document.getElementById('tutorialText'),
    progress: document.getElementById('tutorialProgress'),
    next: document.getElementById('tutorialNext'),
    skip: document.getElementById('tutorialSkip')
};

let stepIndex = 0;
let actionCount = 0;

export function shouldShowTutorial() {
    return Boolean(getLevel().tutorial) && !state.tutorialDone;
}

export function startTutorial() {
    state.phase = 'tutorial';
    // Barre de travail entamée pour voir l'effet de la touche Espace
    state.work = 60;
    renderBars();
    els.panel.classList.remove('hidden');
    showStep(0);
}

function showStep(index) {
    clearTarget();
    stepIndex = index;
    actionCount = 0;

    const step = STEPS[index];
    if (step.onStart) {
        step.onStart();
        renderBars();
    }

    els.step.textContent = `${index + 1}/${STEPS.length}`;
    // Le texte peut être une fonction pour dépendre du niveau
    els.text.innerHTML = typeof step.text === 'function' ? step.text() : step.text;
    els.next.textContent = step.button || '';
    els.next.classList.toggle('hidden', !step.button);
    // Dernière étape : « Passer » ferait doublon avec le bouton
    els.skip.classList.toggle('hidden', Boolean(step.button));
    renderProgress();

    // Mettre en avant l'élément concerné (sprite ou ligne de barre)
    const target = document.querySelector(step.target);
    (target.closest('.stat-bar') || target).classList.add('tuto-target');

    // L'action est peut-être déjà faite (ex : déjà en mode travail)
    checkStep();
}

function renderProgress() {
    const step = STEPS[stepIndex];
    els.progress.textContent = step.action ? `${actionCount} / ${step.count}` : '';
}

// Vérifie si l'étape en cours est validée par l'action reçue
function checkStep(action) {
    if (state.phase !== 'tutorial') return;

    const step = STEPS[stepIndex];
    if (step.action) {
        if (action !== step.action) return;
        actionCount++;
        renderProgress();
        if (actionCount < step.count) return;
    } else if (!step.done || !step.done()) {
        return;
    }

    nextTutorialStep();
}

export function nextTutorialStep() {
    if (stepIndex + 1 < STEPS.length) {
        showStep(stepIndex + 1);
    } else {
        endTutorial();
    }
}

// Fin ou abandon : la journée commence avec les valeurs normales
export function endTutorial() {
    if (state.phase !== 'tutorial') return;

    state.phase = 'playing';
    state.tutorialDone = true;
    state.work = 100;
    state.heat = 0;
    renderBars();
    hideTutorial();
}

export function hideTutorial() {
    clearTarget();
    els.panel.classList.add('hidden');
}

function clearTarget() {
    document.querySelectorAll('.tuto-target').forEach(element => element.classList.remove('tuto-target'));
}

on('mode-changed', () => checkStep());
on('action', action => checkStep(action));
