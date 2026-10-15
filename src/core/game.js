// Déroulement de la partie : boucle de jeu, début et fin de journée, pause
import { state, getLevel, getNextLevel, isLastLevel, isTimeRunning } from './state.js';
import { clampGauge, heatGainAt, advanceTime, getGameOverReason, isBossFurious, formatTime } from './rules.js';
import { on } from './events.js';
import { renderHud, renderBars, renderClock } from '../ui/hud.js';
import { hideAllScreens, showScreen, hideScreen, showLevelComplete, showGameOver } from '../ui/screens.js';
import { trackPay, collectDayPay } from '../systems/money.js';
import { startBubbles, stopBubbles, updateBubbles } from '../systems/bubbles.js';
import { startTutorial, hideTutorial } from '../systems/tutorial.js';
import { playDialogue } from '../systems/dialogue.js';
import { openShop } from '../systems/shop.js';
import { startEmployeeForm, stopEmployeeForm, updateFormDeadline, isFormOverdue } from '../systems/employeeForm.js';
import { startBossMood, stopBossMood, updateBossMood } from '../systems/bossMood.js';
import { updateMeetings, stopMeetings } from '../systems/meetings.js';
import { startOutages, stopOutages, updateOutages } from '../systems/outages.js';
import { startCopyTask, stopCopyTask, updateCopyDeadline, isCopyOverdue, getCopyDeadline } from '../systems/copyTask.js';
import { getDialogue, t } from '../i18n/index.js';

const TICK_MS = 1000;  // Un tick = 5 minutes de jeu
let loopId = null;
let currentDayId = 0;  // Change à chaque (re)lancement de niveau

// Nouvelle partie depuis le menu de démarrage ou « Redémarrer » (ou un autre niveau via le code secret)
export function startGame(levelIndex = 0) {
    resetSession();
    state.levelIndex = levelIndex;
    restartLevel();
}

// Argent et objets achetés repartent de zéro
function resetProgress() {
    state.levelIndex = 0;
    state.totalMoney = 0;
    state.ownedItems = [];
}

// Nouvelle partie : la fiche employé est aussi à remplir de nouveau
function resetSession() {
    resetProgress();
    state.employee = null;
}

// Bouton de l'écran de fin de niveau : boutique, puis niveau suivant
export async function nextLevel() {
    // Après la victoire, REJOUER relance une partie complète
    if (isLastLevel()) {
        resetProgress();
        restartLevel();
        return;
    }

    hideScreen('level');
    await openShop();
    state.levelIndex++;
    restartLevel();
}

// (Re)lance le niveau en cours, remis dans l'état du début de la journée
export function restartLevel() {
    const level = getLevel();
    Object.assign(state, {
        phase: 'playing',
        paused: false,
        hour: level.startHour,
        minute: 0,
        work: 100,
        heat: 0,
        mode: 'idle',
        lastArrow: null,
        lowWorkTicks: 0
    });
    // La fiche signée pendant cette journée est à remplir de nouveau
    if (level.employeeForm) state.employee = null;

    stopBubbles();
    hideTutorial();
    stopEmployeeForm();
    stopCopyTask();
    stopMeetings();
    startOutages();
    startBossMood();
    hideAllScreens();
    renderHud();
    updateMeetings();

    startBubbles();
    startLoop();
    playPrelude(level);
}

// Début de journée : appel de l'histoire et tutoriel, rejoués à chaque (re)lancement,
// puis la fiche employé devient disponible tant qu'elle n'est pas signée
async function playPrelude(level) {
    const dayId = ++currentDayId;
    // Niveau relancé pendant une étape : la suite de l'ancien lancement est périmée
    const isStale = () => dayId !== currentDayId;

    if (level.intro) {
        await playDialogue(getDialogue(level.intro));
        if (isStale()) return;
    }

    if (level.tutorial) {
        await startTutorial();
        if (isStale()) return;
    }

    state.phase = 'playing';
    if (level.employeeForm && !state.employee) startEmployeeForm(level.employeeForm.deadlineHour);
}

function startLoop() {
    clearInterval(loopId);
    loopId = setInterval(() => {
        tick();
        updateBubbles();
    }, TICK_MS);
}

// Un tick : le travail baisse, la chaleur monte, l'heure avance
function tick() {
    if (!isTimeRunning()) return;

    const level = getLevel();
    state.work = clampGauge(state.work - level.workDecay);
    state.heat = clampGauge(state.heat + heatGainAt(state.hour, level));
    renderBars();

    if (checkGameOver()) return;

    // Le temps passé avec peu de travail réduit le salaire du jour
    trackPay();

    Object.assign(state, advanceTime(state.hour, state.minute));
    renderClock();

    updateFormDeadline();
    if (isFormOverdue()) {
        loseDay(t('form.timeout', { time: formatTime(level.employeeForm.deadlineHour) }));
        return;
    }

    updateCopyDeadline();
    if (isCopyOverdue()) {
        loseDay(t('copy.timeout', { time: formatTime(getCopyDeadline()) }));
        return;
    }

    if (state.hour >= level.endHour) {
        completeLevel();
        return;
    }

    updateMeetings();
    updateOutages();
    updateBossMood();
    if (!isTimeRunning()) return;  // Licencié par le patron

    playScheduledCall(level);
}

// Appel de l'histoire prévu à l'heure qui vient de sonner : le temps est figé pendant l'appel,
// puis les textes à recopier éventuels sont donnés
async function playScheduledCall(level) {
    const call = level.calls?.find(c => c.hour === state.hour && state.minute === 0);
    if (!call) return;

    const dayId = currentDayId;
    await playDialogue(getDialogue(call.dialogue));
    // Niveau relancé pendant l'appel : ne pas écraser la phase du nouveau lancement
    if (dayId !== currentDayId) return;
    state.phase = 'playing';
    if (call.copyTask) startCopyTask(call.copyTask);
}

function checkGameOver() {
    const reason = getGameOverReason(state.work, state.heat) ?? (isBossFurious(state.bossMood) ? t('mood.fired') : null);
    if (!reason) return false;

    loseDay(reason);
    return true;
}

function loseDay(reason) {
    endDay();
    showGameOver(reason);
}

// Fige le jeu : horloge, clavier et appels urgents
function endDay() {
    state.phase = 'ended';
    clearInterval(loopId);
    stopBubbles();
    stopEmployeeForm();
    stopCopyTask();
    stopMeetings();
    stopOutages();
    stopBossMood();
}

function completeLevel() {
    endDay();

    const level = getLevel();
    const pay = collectDayPay();
    const payText = `Salaire du jour : ${pay} € — Total : ${state.totalMoney} €`;

    if (isLastLevel()) {
        showLevelComplete({
            title: 'VICTOIRE',
            pay: payText,
            text: `${level.name} terminé ! Vous avez survécu à la canicule.`,
            button: 'REJOUER'
        });
    } else {
        const next = getNextLevel();
        showLevelComplete({
            title: `${level.name.toUpperCase()} TERMINÉ`,
            pay: payText,
            text: `Prochain : ${next.name}. ${next.description}`,
            button: 'CONTINUER'
        });
    }
}

export function togglePause() {
    if (state.phase !== 'playing' && state.phase !== 'tutorial') return;

    state.paused = !state.paused;
    if (state.paused) {
        showScreen('pause');
    } else {
        hideScreen('pause');
    }
}

export function resumeGame() {
    if (state.paused) togglePause();
}

// Travail ou chaleur modifiés hors horloge (appels urgents)
on('stats-changed', () => {
    renderBars();
    if (state.phase === 'playing') checkGameOver();
});
