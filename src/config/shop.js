/**
 * Objets de la boutique, proposés entre deux niveaux.
 * Un objet acheté reste actif jusqu'à la fin de la partie.
 * Nom et description : src/i18n/locales, clés shop.items.<id>.name / .description
 *
 * Chaque effet modifie un paramètre du niveau (voir levels.js) :
 * - multiply : multiplie la valeur (0.75 = -25 %)
 * - add      : ajoute à la valeur
 * Un paramètre imbriqué s'écrit avec un point : 'bubbles.lifetime'.
 *
 * @typedef {Object} Effect
 * @property {string} stat
 * @property {number} [multiply]
 * @property {number} [add]
 *
 * @typedef {Object} ShopItem
 * @property {string} id
 * @property {string} icon
 * @property {number} price  En euros
 * @property {Effect[]} effects
 */

/** @type {ShopItem[]} */
export const SHOP_ITEMS = [
    {
        id: 'fan',
        icon: '🌀',
        price: 60,
        effects: [
            { stat: 'heatMorning', multiply: 0.75 },
            { stat: 'heatAfternoon', multiply: 0.75 }
        ]
    },
    {
        id: 'ai',
        icon: '🤖',
        price: 80,
        effects: [
            { stat: 'workDecay', multiply: 0.7 }
        ]
    },
    {
        id: 'plant',
        icon: '🪴',
        price: 30,
        effects: [
            { stat: 'overheatThreshold', add: 10 }
        ]
    },
    {
        id: 'voicemail',
        icon: '📼',
        price: 40,
        effects: [
            { stat: 'bubbles.lifetime', add: 3 }
        ]
    }
];
