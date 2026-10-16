// Tests des fins : conditions de déblocage et cohérence avec la boutique et les niveaux
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { getUnlockedEndings } from '../src/core/endings.js';
import { ENDINGS } from '../src/config/endings.js';
import { SHOP_ITEMS } from '../src/config/shop.js';
import { LEVELS } from '../src/config/levels.js';
import { LOCALES } from '../src/i18n/index.js';

const unlockedIds = (items, money) => getUnlockedEndings(ENDINGS, items, money).map(ending => ending.id);

describe('fins débloquées', () => {
    test('sans objet : seulement la fin par défaut', () => {
        assert.deepEqual(unlockedIds([], 0), ['employee']);
        assert.deepEqual(unlockedIds([], 1000), ['employee']);
    });

    test('le magnétophone débloque le chantage', () => {
        assert.deepEqual(unlockedIds(['recorder'], 0), ['employee', 'blackmail']);
    });

    test('la plainte demande magnétophone, don et 200 € en banque', () => {
        assert.deepEqual(unlockedIds(['recorder', 'donation'], 200), ['employee', 'blackmail', 'lawsuit']);
        assert.ok(!unlockedIds(['recorder', 'donation'], 199).includes('lawsuit'));
        assert.ok(!unlockedIds(['donation'], 500).includes('lawsuit'));
    });
});

describe('configuration des fins', () => {
    test('une fin par défaut, sans condition', () => {
        assert.ok(ENDINGS.some(ending => !ending.items?.length && !ending.money));
    });

    test('les objets requis sont des objets d\'histoire de la boutique', () => {
        for (const { id, items = [] } of ENDINGS) {
            for (const itemId of items) {
                const item = SHOP_ITEMS.find(shopItem => shopItem.id === itemId);
                assert.ok(item, `${id} : objet « ${itemId} » inconnu`);
                assert.equal(item.effects.length, 0, `${id} : « ${itemId} » n'est pas un objet d'histoire`);
            }
        }
    });

    test('chaque fin est atteignable : objets en vente avant le dernier jour et assez d\'argent', () => {
        const shopDays = LEVELS.length - 1;  // Une boutique après chaque jour, sauf le dernier
        const maxMoney = LEVELS.reduce((total, level) => total + level.dailyPay, 0);
        for (const { id, items = [], money = 0 } of ENDINGS) {
            let cost = 0;
            for (const itemId of items) {
                const item = SHOP_ITEMS.find(shopItem => shopItem.id === itemId);
                assert.ok(!item.days || item.days.some(day => day <= shopDays), `${id} : « ${itemId} » jamais en vente`);
                cost += item.price;
            }
            assert.ok(maxMoney - cost >= money, `${id} : ${money} € impossible à garder`);
        }
    });

    test('chaque fin a un titre, un choix et un récit dans chaque langue', () => {
        for (const [code, locale] of Object.entries(LOCALES)) {
            for (const { id } of ENDINGS) {
                const texts = locale.ui.endings.list[id];
                assert.ok(texts?.title && texts?.choice, `${code} / ${id} : titre ou choix manquant`);
                assert.ok(texts.text?.length > 0 && texts.text.every(paragraph => paragraph.trim()), `${code} / ${id} : récit vide`);
            }
        }
    });
});
