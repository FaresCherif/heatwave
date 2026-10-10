// Interface du haut de l'écran : horloge, salaire, mode actif et barres
import { state, getLevel } from '../core/state.js';
import { isOverheated, workBarColor, heatBarColor, computeDayPay, formatTime } from '../core/rules.js';
import { playEffect, highlightZones } from './effects.js';

const els = {
    levelLabel: document.querySelector('.level-label'),
    clock: document.querySelector('.clock'),
    dayPay: document.querySelector('.day-pay'),
    totalMoney: document.querySelector('.total-money'),
    modeIndicator: document.getElementById('workModeIndicator'),
    modeLabel: document.getElementById('modeLabel'),
    alternate: document.getElementById('alternateIndicator'),
    workBar: document.querySelector('.work-bar-fill'),
    heatBar: document.querySelector('.heat-bar-fill'),
    workThreshold: document.querySelector('.work-threshold'),
    heatThreshold: document.querySelector('.heat-threshold')
};

const MODE_NAMES = { idle: 'REPOS', work: 'TRAVAIL', cool: 'VENTILATION' };

export function renderLevelLabel() {
    els.levelLabel.textContent = getLevel().name;
}

export function renderClock() {
    els.clock.textContent = formatTime(state.hour, state.minute);
}

export function renderBars() {
    const level = getLevel();

    els.workBar.style.width = state.work + '%';
    els.workBar.style.backgroundColor = workBarColor(state.work, level);
    els.heatBar.style.width = state.heat + '%';
    els.heatBar.style.backgroundColor = heatBarColor(state.heat);

    // Traits des seuils : salaire réduit et surchauffe
    els.workThreshold.style.left = level.lowWorkThreshold + '%';
    els.heatThreshold.style.left = level.overheatThreshold + '%';

    // Signaler la surchauffe sur la ligne Chaleur
    els.heatBar.closest('.stat-bar').classList.toggle('overheat', isOverheated(state.heat, level));
}

export function renderMoney({ lostPay = false } = {}) {
    els.dayPay.textContent = `💰 ${computeDayPay(getLevel(), state.lowWorkTicks)} €`;
    els.totalMoney.textContent = `Total : ${state.totalMoney} €`;
    if (lostPay) playEffect(els.dayPay, 'pay-loss');
}

export function renderMode() {
    els.modeIndicator.dataset.mode = state.mode;
    els.modeLabel.textContent = `MODE ${MODE_NAMES[state.mode]}`;

    // En ventilation : rappel de l'alternance des flèches
    const cooling = state.mode === 'cool';
    els.alternate.classList.toggle('active', cooling);
    els.alternate.classList.remove('left', 'right');
    els.alternate.textContent = 'Alterne ← →';

    highlightZones(state.mode);
}

export function renderNextArrow(lastArrow) {
    els.alternate.textContent = lastArrow === 'left' ? 'Prochain : →' : 'Prochain : ←';
    els.alternate.classList.toggle('left', lastArrow === 'left');
    els.alternate.classList.toggle('right', lastArrow === 'right');
}

// Redessine tout le HUD (début de journée)
export function renderHud() {
    renderLevelLabel();
    renderClock();
    renderBars();
    renderMoney();
    renderMode();
}
