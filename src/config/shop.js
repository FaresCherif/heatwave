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
 * requires : fonctionnalité de niveau améliorée par l'objet (clé de levels.js, ex : 'bubbles').
 * L'objet n'est proposé qu'une fois cette fonctionnalité rencontrée dans un niveau déjà joué :
 * le joueur doit l'avoir testée naturellement avant de pouvoir l'améliorer.
 *
 * days : boutiques où l'objet est proposé, par numéro du jour qui vient de se terminer
 * (ex : [1, 2] = après les jours 1 et 2). Sans : proposé dans toutes les boutiques.
 *
 * Objets d'histoire : effects vide, aucun effet de jeu. Leur achat (state.ownedItems)
 * servira à débloquer des fins.
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
 * @property {Effect[]} effects   Vide pour un objet d'histoire
 * @property {string} [requires]  Fonctionnalité à avoir rencontrée (sans : toujours proposé)
 * @property {number[]} [days]    Jours après lesquels l'objet est proposé (sans : tous)
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
        requires: 'bubbles',
        effects: [
            { stat: 'bubbles.lifetime', add: 3 }
        ]
    },
    {
        id: 'coffee',
        icon: '☕',
        price: 50,
        effects: [
            { stat: 'workPerPress', multiply: 1.5 }
        ]
    },
    {
        id: 'mister',
        icon: '💦',
        price: 45,
        effects: [
            { stat: 'fanCooling', multiply: 1.4 }
        ]
    },
    {
        id: 'chair',
        icon: '🪑',
        price: 70,
        effects: [
            { stat: 'overheatWorkFactor', add: 0.25 }
        ]
    },
    {
        id: 'headset',
        icon: '🎧',
        price: 50,
        requires: 'bubbles',
        effects: [
            { stat: 'bubbles.penalty', multiply: 0.6 }
        ]
    },
    {
        id: 'mug',
        icon: '🏆',
        price: 55,
        requires: 'bossMood',
        effects: [
            { stat: 'bossMood.start', add: 20 }
        ]
    },
    {
        id: 'background',
        icon: '🖼️',
        price: 60,
        requires: 'meetings',
        effects: [
            { stat: 'meetings.moodPenalty', add: -2 }
        ]
    },

    // Objets d'histoire : sans effet de jeu, ils débloqueront des fins
    {
        id: 'recorder',
        icon: '🎙️',
        price: 35,
        days: [1, 2],
        effects: []
    },
    {
        id: 'donation',
        icon: '🏥',
        price: 50,
        days: [3],
        effects: []
    }
];
