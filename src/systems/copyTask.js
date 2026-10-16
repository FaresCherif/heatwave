// Gratte-papier : des phrases à recopier pendant la journée, avant une heure limite.
// Chaque phrase recopiée rapporte du travail. Un bouton ouvre et ferme la zone de saisie
// tant que la tâche n'est pas finie ; le temps continue de s'écouler.
import { state, isTimeRunning } from '../core/state.js';
import { clampGauge, formatTime, minutesUntil, isCopyOnTrack, isCopyComplete } from '../core/rules.js';
import { emit, on } from '../core/events.js';
import { showFloatingText } from '../ui/effects.js';
import { applyTranslations, getCopyTexts, t } from '../i18n/index.js';

const URGENT_MINUTES = 30;  // Échéance signalée en rouge dans les 30 dernières minutes de jeu

const els = {
    panel: document.getElementById('copyTask'),
    deadline: document.getElementById('copyDeadline'),
    progress: document.getElementById('copyProgress'),
    model: document.getElementById('copyModel'),
    input: document.getElementById('copyInput'),
    close: document.getElementById('copyClose'),
    toggle: document.getElementById('copyToggle'),
    toggleDeadline: document.getElementById('copyToggleDeadline')
};

/** @type {{texts: string[], index: number, deadlineHour: number, reward: number}|null} */
let task = null;  // null : aucune tâche en cours

// Phrases tirées au hasard, sans doublon
function pickTexts(count, pool) {
    const texts = [...getCopyTexts(pool)];
    for (let i = texts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [texts[i], texts[j]] = [texts[j], texts[i]];
    }
    return texts.slice(0, count);
}

/** Donne la tâche (bouton visible) : config.count phrases à recopier avant config.deadlineHour. */
export function startCopyTask(/** @type {import('../config/levels.js').CopyTask} */ config) {
    task = { texts: pickTexts(config.count, config.pool), index: 0, deadlineHour: config.deadlineHour, reward: config.reward };
    applyTranslations(els.panel);
    applyTranslations(els.toggle);
    els.input.placeholder = t('copy.placeholder');

    const deadlineText = t('copy.deadline', { time: formatTime(task.deadlineHour) });
    els.deadline.textContent = deadlineText;
    els.toggleDeadline.textContent = deadlineText;

    showText();
    updateCopyDeadline();
    setOpen(false);
    els.toggle.classList.remove('hidden');
}

/** Retire la tâche et son bouton (tâche finie, ou journée terminée ou relancée). */
export function stopCopyTask() {
    task = null;
    setOpen(false);
    els.toggle.classList.add('hidden');
}

/** Phrases non toutes recopiées à l'heure limite */
export function isCopyOverdue() {
    return task !== null && minutesUntil(state.hour, state.minute, task.deadlineHour) <= 0;
}

/** Heure limite de la tâche en cours, pour le message de game over */
export function getCopyDeadline() {
    return task?.deadlineHour;
}

// Appelée à chaque tick : l'échéance passe au rouge quand elle approche
export function updateCopyDeadline() {
    if (!task) return;
    const urgent = minutesUntil(state.hour, state.minute, task.deadlineHour) <= URGENT_MINUTES;
    els.deadline.classList.toggle('urgent', urgent);
    els.toggle.classList.toggle('urgent', urgent);
}

function showText() {
    els.progress.textContent = t('copy.progress', { current: task.index + 1, total: task.texts.length });
    els.model.textContent = task.texts[task.index];
    els.input.value = '';
    els.input.classList.remove('error');
}

function setOpen(open) {
    els.panel.classList.toggle('hidden', !open);
    els.toggle.classList.toggle('open', open);
    els.toggle.setAttribute('aria-expanded', String(open));

    if (open) {
        els.input.focus();
    } else if (els.panel.contains(document.activeElement)) {
        // Rendre le clavier au jeu (Espace, flèches)
        document.activeElement.blur();
    }
}

function onInput() {
    if (!task) return;
    const model = task.texts[task.index];
    const typed = els.input.value;

    if (!isCopyComplete(model, typed)) {
        els.input.classList.toggle('error', !isCopyOnTrack(model, typed));
        return;
    }

    // Phrase recopiée : travail gagné, puis phrase suivante
    state.work = clampGauge(state.work + task.reward);
    emit('stats-changed');
    if (!task) return;  // Journée terminée entre-temps
    showFloatingText(`+${task.reward}`, els.input, 'gain');

    task.index++;
    if (task.index < task.texts.length) {
        showText();
    } else {
        stopCopyTask();
    }
}

// Pas de saisie quand le temps est figé (pause, appel), sans courant, ni de copier-coller
els.input.addEventListener('beforeinput', event => {
    if (!isTimeRunning() || state.powerOut || event.inputType.startsWith('insertFromPaste') || event.inputType === 'insertFromDrop') {
        event.preventDefault();
    }
});

// Coupure de courant : l'ordinateur est éteint, la feuille se referme (le disjoncteur prend sa place)
on('power-changed', () => {
    if (state.powerOut) setOpen(false);
});
els.input.addEventListener('input', onInput);

els.toggle.addEventListener('click', () => {
    els.toggle.blur();
    if (task && !state.powerOut) setOpen(els.panel.classList.contains('hidden'));
});
els.close.addEventListener('click', () => setOpen(false));
