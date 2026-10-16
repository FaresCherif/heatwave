// Tutoriel guidé : le temps reste figé (phase 'tutorial') tant qu'il est affiché.
// Chaque étape attend une action du joueur avant de passer à la suivante :
// - done : condition vérifiée à chaque changement de mode
// - action + count : nombre d'actions ('work' ou 'cool') à réaliser
// - button : étape validée par un bouton
import { state, getLevel } from '../core/state.js';
import { on } from '../core/events.js';
import { renderBars } from '../ui/hud.js';
import { t } from '../i18n/index.js';

// Textes : src/i18n/locales, clés tutorial.steps.<id>
const STEPS = [
    {
        id: 'mode',
        target: '.joueur',
        done: () => state.mode === 'work'
    },
    {
        id: 'work',
        target: '.work-bar-fill',
        action: 'work',
        count: 5
    },
    {
        id: 'fan',
        target: '.handfan',
        done: () => state.mode === 'cool',
        onStart: () => { state.heat = 40; }  // Pour voir la chaleur baisser à l'étape suivante
    },
    {
        id: 'cool',
        target: '.heat-bar-fill',
        action: 'cool',
        count: 6
    },
    {
        id: 'overheat',
        target: '.heat-threshold',
        button: 'tutorial.start'
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
let resolveEnd = null;  // Résout la promesse de startTutorial()

/** @returns {Promise<void>} Résolue à la fin du tutoriel (terminé ou passé) */
export function startTutorial() {
    state.phase = 'tutorial';
    // Barre de travail entamée pour voir l'effet de la touche Espace
    state.work = 60;
    renderBars();
    els.panel.classList.remove('hidden');
    showStep(0);
    return new Promise(resolve => { resolveEnd = resolve; });
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
    // Le texte peut dépendre du niveau : {hour} = heure de fin de journée
    els.text.innerHTML = t(`tutorial.steps.${step.id}`, { hour: getLevel().endHour });
    els.next.textContent = step.button ? t(step.button) : '';
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
    state.work = 100;
    state.heat = 0;
    renderBars();
    hideTutorial();
    resolveEnd?.();
    resolveEnd = null;
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
