/**
 * Règles du jeu sous forme de fonctions pures : aucune dépendance au DOM ni à l'état global.
 * Elles reçoivent des valeurs et le niveau en paramètre, ce qui les rend testables
 * (voir tests/rules.test.js).
 *
 * @typedef {import('../config/levels.js').Level} Level
 */

export const MINUTES_PER_TICK = 5;
export const TICKS_PER_HOUR = 60 / MINUTES_PER_TICK;

/** Borne une jauge entre 0 et 100. */
export function clampGauge(value) {
    return Math.min(100, Math.max(0, value));
}

/** Chaleur gagnée à chaque tick : plus forte l'après-midi. */
export function heatGainAt(hour, /** @type {Level} */ level) {
    return hour >= 12 ? level.heatAfternoon : level.heatMorning;
}

export function isOverheated(heat, /** @type {Level} */ level) {
    return heat >= level.overheatThreshold;
}

/** Travail gagné par appui sur Espace : réduit en surchauffe. */
export function workGain(heat, /** @type {Level} */ level) {
    return isOverheated(heat, level) ? level.workPerPress * level.overheatWorkFactor : level.workPerPress;
}

/**
 * La ventilation n'agit que si les flèches sont alternées.
 * @param {'left'|'right'|null} lastArrow
 * @param {'left'|'right'} arrow
 */
export function isValidAlternation(lastArrow, arrow) {
    return lastArrow === null || lastArrow !== arrow;
}

/** Avance l'heure d'un tick. */
export function advanceTime(hour, minute) {
    const total = hour * 60 + minute + MINUTES_PER_TICK;
    return { hour: Math.floor(total / 60), minute: total % 60 };
}

/** Heure au format 13:05 */
export function formatTime(hour, minute = 0) {
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

/** Minutes restantes avant une heure limite (négatif si dépassée). */
export function minutesUntil(hour, minute, deadlineHour) {
    return deadlineHour * 60 - (hour * 60 + minute);
}

/** @returns {string|null} La raison de la défaite, ou null si la partie continue. */
export function getGameOverReason(work, heat) {
    if (heat >= 100) return 'Trop chaud ! Vous avez fini en merguez.';
    if (work <= 0) return 'Du balais ! Vous n\'avez pas atteint vos objectifs';
    return null;
}

/** Nombre de ticks dans la journée du niveau. */
export function getDayTicks(/** @type {Level} */ level) {
    return (level.endHour - level.startHour) * TICKS_PER_HOUR;
}

/** Salaire du jour, réduit en proportion du temps passé sous le seuil de travail. */
export function computeDayPay(/** @type {Level} */ level, lowWorkTicks) {
    const ratio = Math.min(1, lowWorkTicks / getDayTicks(level));
    return Math.round(level.dailyPay * (1 - ratio));
}

/** Vert, orange sous le seuil de salaire, puis rouge quand le travail devient critique. */
export function workBarColor(work, /** @type {Level} */ level) {
    if (work <= 25) return 'hsl(0, 85%, 50%)';
    if (work < level.lowWorkThreshold) return 'hsl(30, 95%, 50%)';
    return 'hsl(130, 70%, 45%)';
}

/** 0 % = jaune, 100 % = rouge (jamais vert : pas de confusion avec le travail). */
export function heatBarColor(heat) {
    return `hsl(${50 - heat * 0.5}, 100%, 50%)`;
}
