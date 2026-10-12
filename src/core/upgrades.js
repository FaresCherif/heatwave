/**
 * Effets des objets achetés en boutique (fonctions pures, testées).
 *
 * @typedef {import('../config/levels.js').Level} Level
 * @typedef {import('../config/shop.js').ShopItem} ShopItem
 */

/**
 * Renvoie une copie du niveau avec les effets des objets possédés appliqués.
 * Le niveau d'origine n'est jamais modifié.
 * @param {Level} level
 * @param {ShopItem[]} items  Objets possédés
 * @returns {Level}
 */
export function applyUpgrades(level, items) {
    const result = structuredClone(level);

    for (const { effects } of items) {
        for (const { stat, multiply = 1, add = 0 } of effects) {
            const path = stat.split('.');
            const key = path.pop();
            const parent = path.reduce((node, part) => node?.[part], result);
            // Paramètre absent du niveau (ex : pas d'appels urgents) : effet sans objet
            if (!parent || typeof parent[key] !== 'number') continue;
            parent[key] = parent[key] * multiply + add;
        }
    }
    return result;
}

/** L'objet peut-il être acheté ? */
export function canBuy(item, money, ownedIds) {
    return !ownedIds.includes(item.id) && money >= item.price;
}
