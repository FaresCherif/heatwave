/**
 * Fins débloquées (fonction pure, testée).
 *
 * @typedef {import('../config/endings.js').Ending} Ending
 */

/**
 * Fins dont toutes les conditions sont remplies, dans l'ordre de la configuration.
 * @param {Ending[]} endings
 * @param {string[]} ownedItems  Objets achetés
 * @param {number} money         Argent en banque
 * @returns {Ending[]}
 */
export function getUnlockedEndings(endings, ownedItems, money) {
    return endings.filter(ending =>
        (ending.items ?? []).every(item => ownedItems.includes(item)) && money >= (ending.money ?? 0)
    );
}
