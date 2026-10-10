import { LEVELS } from '../config/levels.js';

/**
 * État unique de la partie, partagé par tous les modules.
 *
 * phase :
 * - 'menu'     : menu de démarrage
 * - 'tutorial' : tutoriel en cours, le temps est figé
 * - 'playing'  : journée en cours
 * - 'ended'    : journée terminée (réussie ou game over)
 * La pause est un indicateur séparé : elle peut interrompre le tutoriel comme la journée.
 */
export const state = {
    phase: 'menu',
    paused: false,
    levelIndex: 0,

    hour: 8,
    minute: 0,
    work: 100,          // 0 à 100
    heat: 0,            // 0 à 100
    mode: 'idle',       // 'idle' | 'work' | 'cool'
    lastArrow: null,    // Dernière flèche valide en mode ventilation : 'left' | 'right'

    lowWorkTicks: 0,    // Ticks passés sous le seuil de salaire pendant la journée
    totalMoney: 0,      // Argent cumulé sur la partie

    tutorialDone: false // Le tutoriel ne s'affiche qu'une fois par session
};

export function getLevel() {
    return LEVELS[state.levelIndex];
}

export function isLastLevel() {
    return state.levelIndex >= LEVELS.length - 1;
}

export function getNextLevel() {
    return LEVELS[state.levelIndex + 1];
}

// Le joueur peut agir (tutoriel ou journée), hors pause
export function acceptsInput() {
    return (state.phase === 'tutorial' || state.phase === 'playing') && !state.paused;
}

// Le temps s'écoule (horloge, appels urgents)
export function isTimeRunning() {
    return state.phase === 'playing' && !state.paused;
}
