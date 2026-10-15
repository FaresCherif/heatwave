import { LEVELS } from '../config/levels.js';
import { SHOP_ITEMS } from '../config/shop.js';
import { applyUpgrades } from './upgrades.js';

/**
 * État unique de la partie, partagé par tous les modules.
 *
 * phase :
 * - 'menu'     : menu de démarrage
 * - 'dialogue' : appel téléphonique de l'histoire, le temps est figé
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
    /** @type {number|null} */
    bossMood: null,     // Humeur du patron, 0 à 100 (null : niveau sans humeur)

    lowWorkTicks: 0,    // Ticks passés sous le seuil de salaire pendant la journée
    totalMoney: 0,      // Argent cumulé sur la partie

    /** @type {import('./employee.js').Employee|null} */
    employee: null,             // Fiche du nouvel employé, une fois remplie
    /** @type {string[]} */
    ownedItems: []              // Objets achetés en boutique (identifiants), pour toute la partie
};

/** Objets possédés, dans l'ordre de la boutique */
export function getOwnedItems() {
    return SHOP_ITEMS.filter(item => state.ownedItems.includes(item.id));
}

/** Paramètres du niveau en cours, effets des objets achetés compris */
export function getLevel() {
    return applyUpgrades(LEVELS[state.levelIndex], getOwnedItems());
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
