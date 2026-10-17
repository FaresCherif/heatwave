// Tests des traductions : complétude des langues et repli sur le français
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { LOCALES, DEFAULT_LANGUAGE, t, getDialogue, setLanguage, getLanguage, formatNumber, pickBrowserLanguage } from '../src/i18n/index.js';
import { LEVELS } from '../src/config/levels.js';
import { SHOP_ITEMS } from '../src/config/shop.js';

const reference = LOCALES[DEFAULT_LANGUAGE];

// Liste les clés feuilles d'un objet de textes : 'dialogue.skip', ...
function leafKeys(node, prefix = '') {
    return Object.entries(node).flatMap(([key, value]) =>
        typeof value === 'object' ? leafKeys(value, `${prefix}${key}.`) : [`${prefix}${key}`]
    );
}

// Toutes les répliques d'un dialogue, variantes comprises
function dialogueTexts(dialogue) {
    return dialogue.lines.flatMap(line => typeof line === 'string' ? [line] : [...line.lines, ...(line.otherwise ?? [])]);
}

// Objets dont dépend chaque variante, dans l'ordre
function variants(dialogue) {
    return dialogue.lines.filter(line => typeof line !== 'string').map(line => line.ifOwned);
}

describe('langues', () => {
    for (const [code, locale] of Object.entries(LOCALES)) {
        test(`${code} : tous les textes d'interface sont traduits`, () => {
            const missing = leafKeys(reference.ui).filter(key => !leafKeys(locale.ui).includes(key));
            assert.deepEqual(missing, []);
        });

        test(`${code} : tous les dialogues sont traduits et complets`, () => {
            for (const id of Object.keys(reference.dialogues)) {
                const dialogue = locale.dialogues[id];
                assert.ok(dialogue, `dialogue « ${id} » manquant`);
                assert.ok(dialogue.caller, `« ${id} » : interlocuteur manquant`);
                assert.ok(dialogue.lines.length > 0, `« ${id} » : aucune réplique`);
                assert.ok(dialogueTexts(dialogue).every(line => line.trim()), `« ${id} » : réplique vide`);
                // Mêmes variantes selon les objets achetés que la langue de référence
                assert.deepEqual(variants(dialogue), variants(reference.dialogues[id]), `« ${id} » : variantes différentes`);
            }
        });

        test(`${code} : assez de messages du patron, chacun avec 3 réponses`, () => {
            assert.equal(locale.bossMessages.length, reference.bossMessages.length);
            for (const { text, answers } of locale.bossMessages) {
                assert.ok(text.trim(), 'message vide');
                assert.equal(answers.length, 3, `« ${text} » : 3 réponses attendues`);
            }
            for (const { id, bossMood } of LEVELS.filter(level => level.bossMood)) {
                assert.ok(locale.bossMessages.length >= bossMood.messageHours.length, `${id} : pas assez de messages`);
                assert.equal(bossMood.answerMood.length, 3, `${id} : answerMood attend 3 valeurs`);
            }
        });

        test(`${code} : assez de phrases à recopier`, () => {
            for (const { calls = [] } of LEVELS) {
                for (const { copyTask } of calls.filter(call => call.copyTask)) {
                    const pool = copyTask.pool ?? 'copyTexts';
                    assert.equal(locale[pool]?.length, reference[pool].length, `${pool} : nombre de phrases`);
                    assert.ok(locale[pool].length >= copyTask.count, `${pool} : ${copyTask.count} phrases demandées`);
                }
            }
        });
    }

    test('chaque appel d\'introduction de niveau existe', () => {
        for (const { id, intro } of LEVELS.filter(level => level.intro)) {
            assert.ok(reference.dialogues[intro], `${id} : dialogue « ${intro} » introuvable`);
        }
    });

    test('chaque niveau a un identifiant unique, un nom et une description', () => {
        const ids = LEVELS.map(level => level.id);
        assert.equal(new Set(ids).size, ids.length, 'identifiants en double');
        for (const id of ids) {
            const texts = reference.ui.levels[id];
            assert.ok(texts?.name && texts?.description, `${id} : textes manquants`);
        }
    });

    test('chaque appel pendant la journée existe', () => {
        for (const { id, calls = [] } of LEVELS) {
            for (const { dialogue } of calls) {
                assert.ok(reference.dialogues[dialogue], `${id} : dialogue « ${dialogue} » introuvable`);
            }
        }
    });
});

describe('accès aux textes', () => {
    test('français par défaut hors navigateur', () => {
        assert.equal(getLanguage(), 'fr');
        assert.equal(t('dialogue.skip'), reference.ui.dialogue.skip);
    });

    test('change de langue', () => {
        setLanguage('en');
        assert.equal(t('dialogue.skip'), LOCALES.en.ui.dialogue.skip);
        assert.equal(getDialogue('welcome').caller, LOCALES.en.dialogues.welcome.caller);
        setLanguage(DEFAULT_LANGUAGE);
    });

    test('choisit les répliques selon les objets achetés', () => {
        const [variant] = reference.dialogues.thirdday.lines.filter(line => typeof line !== 'string');
        const withItem = getDialogue('thirdday', [variant.ifOwned]).lines;
        const without = getDialogue('thirdday').lines;
        assert.ok(withItem.includes(variant.lines[0]) && !withItem.includes(variant.otherwise[0]));
        assert.ok(without.includes(variant.otherwise[0]) && !without.includes(variant.lines[0]));
        assert.ok(withItem.every(line => typeof line === 'string'));
    });

    test('chaque variante dépend d\'un objet de la boutique', () => {
        for (const [id, dialogue] of Object.entries(reference.dialogues)) {
            for (const item of variants(dialogue)) {
                assert.ok(SHOP_ITEMS.some(shopItem => shopItem.id === item), `« ${id} » : objet « ${item} » inconnu`);
            }
        }
    });

    test('arrondit les nombres affichés à une décimale', () => {
        assert.equal(formatNumber(1.5 * 1.4), '2,1');  // 2.0999999999999996 en flottant
        assert.equal(formatNumber(0.75), '0,8');
        assert.equal(formatNumber(15), '15');
        setLanguage('en');
        assert.equal(formatNumber(1.5 * 1.4), '2.1');
        setLanguage(DEFAULT_LANGUAGE);
    });

    test('ignore une langue inconnue', () => {
        setLanguage('xx');
        assert.equal(getLanguage(), DEFAULT_LANGUAGE);
    });

    test('remplace les variables du texte', () => {
        assert.equal(t('form.deadline', { time: '16:00' }), 'À rendre avant 16:00');
    });

    test('renvoie la clé si le texte n\'existe nulle part', () => {
        assert.equal(t('inconnu.cle'), 'inconnu.cle');
    });
});

describe('langue du navigateur', () => {
    test('prend la première langue connue, variante régionale comprise', () => {
        assert.equal(pickBrowserLanguage(['fr-FR', 'en-US']), 'fr');
        assert.equal(pickBrowserLanguage(['en-GB', 'fr']), 'en');
        assert.equal(pickBrowserLanguage(['de-DE', 'FR-ca']), 'fr');
    });

    test('anglais si aucune langue du navigateur n\'est traduite', () => {
        assert.equal(pickBrowserLanguage(['es-ES', 'de']), 'en');
        assert.equal(pickBrowserLanguage([]), 'en');
    });
});
