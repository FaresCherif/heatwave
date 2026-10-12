// Tests de la boutique : effets des objets et conditions d'achat
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { applyUpgrades, canBuy } from '../src/core/upgrades.js';
import { SHOP_ITEMS } from '../src/config/shop.js';
import { LOCALES, DEFAULT_LANGUAGE } from '../src/i18n/index.js';

const level = {
    workDecay: 2, heatMorning: 1, heatAfternoon: 4,
    bubbles: { lifetime: 5, penalty: 15 }
};
const item = (id, effects, price = 50) => ({ id, icon: '?', price, effects });

describe('effets des objets', () => {
    test('multiplie un paramètre', () => {
        const result = applyUpgrades(level, [item('fan', [{ stat: 'heatAfternoon', multiply: 0.75 }])]);
        assert.equal(result.heatAfternoon, 3);
    });

    test('ajoute à un paramètre imbriqué', () => {
        const result = applyUpgrades(level, [item('voicemail', [{ stat: 'bubbles.lifetime', add: 3 }])]);
        assert.equal(result.bubbles.lifetime, 8);
    });

    test('cumule les effets de plusieurs objets', () => {
        const result = applyUpgrades(level, [
            item('a', [{ stat: 'workDecay', multiply: 0.5 }]),
            item('b', [{ stat: 'workDecay', add: 1 }])
        ]);
        assert.equal(result.workDecay, 2);
    });

    test('ne modifie jamais le niveau d\'origine', () => {
        applyUpgrades(level, [item('voicemail', [{ stat: 'bubbles.lifetime', add: 3 }])]);
        assert.equal(level.bubbles.lifetime, 5);
    });

    test('ignore un effet sur un paramètre absent (niveau sans appels urgents)', () => {
        const calm = { ...level, bubbles: null };
        const result = applyUpgrades(calm, [item('voicemail', [{ stat: 'bubbles.lifetime', add: 3 }])]);
        assert.equal(result.bubbles, null);
    });

    test('sans objet, le niveau est inchangé', () => {
        assert.deepEqual(applyUpgrades(level, []), level);
    });
});

describe('achat', () => {
    const fan = item('fan', [], 60);

    test('possible avec assez d\'argent', () => {
        assert.equal(canBuy(fan, 60, []), true);
    });

    test('impossible sans assez d\'argent', () => {
        assert.equal(canBuy(fan, 59, []), false);
    });

    test('impossible si déjà possédé', () => {
        assert.equal(canBuy(fan, 500, ['fan']), false);
    });
});

describe('catalogue', () => {
    test('chaque objet a un identifiant unique, un prix et des effets', () => {
        const ids = SHOP_ITEMS.map(({ id }) => id);
        assert.equal(new Set(ids).size, ids.length);
        for (const { id, price, effects } of SHOP_ITEMS) {
            assert.ok(price > 0, `${id} : prix`);
            assert.ok(effects.length > 0, `${id} : effets`);
        }
    });

    test('chaque objet a un nom et une description traduits', () => {
        const texts = LOCALES[DEFAULT_LANGUAGE].ui.shop.items;
        for (const { id } of SHOP_ITEMS) {
            assert.ok(texts[id]?.name && texts[id]?.description, `${id} : textes manquants`);
        }
    });
});
