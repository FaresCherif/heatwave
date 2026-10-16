/**
 * Fins de la partie, proposées à la fin du dernier niveau selon les choix du joueur.
 * Titre, choix et récit : src/i18n/locales, clés endings.list.<id>
 *
 * Conditions (toutes requises) :
 * - items : objets d'histoire achetés en boutique (src/config/shop.js)
 * - money : argent en banque à la fin du dernier jour, salaire compris
 * Une fin sans condition est toujours disponible (fin par défaut).
 *
 * @typedef {Object} Ending
 * @property {string} id
 * @property {string[]} [items]
 * @property {number} [money]
 */

/** @type {Ending[]} */
export const ENDINGS = [
    { id: 'employee' },
    { id: 'blackmail', items: ['recorder'] },
    { id: 'lawsuit', items: ['recorder', 'donation'], money: 200 }
];
