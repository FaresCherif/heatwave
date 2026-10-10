// Déroulement de la partie : boucle de jeu, début et fin de journée, pause
import { state, getLevel, getNextLevel, isLastLevel, isTimeRunning } from './state.js';
import { clampGauge, heatGainAt, advanceTime, getGameOverReason } from './rules.js';
import { on } from './events.js';
import { renderHud, renderBars, renderClock } from '../ui/hud.js';
import { hideAllScreens, showScreen, hideScreen, showLevelComplete, showGameOver } from '../ui/screens.js';
import { trackPay, collectDayPay } from '../systems/money.js';
import { startBubbles, stopBubbles, updateBubbles } from '../systems/bubbles.js';
import { shouldShowTutorial, startTutorial, hideTutorial } from '../systems/tutorial.js';

const TICK_MS = 1000;  // Un tick = 5 minutes de jeu
let loopId = null;

// Nouvelle partie depuis le menu de démarrage
export function startGame() {
    state.levelIndex = 0;
    state.totalMoney = 0;
    restartLevel();
}

// Bouton de l'écran de fin de niveau
export function nextLevel() {
    // Après la victoire, REJOUER relance une partie complète
    if (isLastLevel()) {
        state.levelIndex = 0;
        state.totalMoney = 0;
    } else {
        state.levelIndex++;
    }
    restartLevel();
}

// (Re)lance le niveau en cours depuis le début de la journée
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

    stopBubbles();
    hideTutorial();
    hideAllScreens();
    renderHud();

    if (shouldShowTutorial()) startTutorial();
    startBubbles();
    startLoop();
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

    if (state.hour >= level.endHour) completeLevel();
}

function checkGameOver() {
    const reason = getGameOverReason(state.work, state.heat);
    if (!reason) return false;

    endDay();
    showGameOver(reason);
    return true;
}

// Fige le jeu : horloge, clavier et appels urgents
function endDay() {
    state.phase = 'ended';
    clearInterval(loopId);
    stopBubbles();
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
            button: 'NIVEAU SUIVANT'
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
