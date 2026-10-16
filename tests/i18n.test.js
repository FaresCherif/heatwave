// Tests des traductions : complétude des langues et repli sur le français
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { LOCALES, DEFAULT_LANGUAGE, t, getDialogue, setLanguage, getLanguage } from '../src/i18n/index.js';
import { LEVELS } from '../src/config/levels.js';

const reference = LOCALES[DEFAULT_LANGUAGE];

// Liste les clés feuilles d'un objet de textes : 'dialogue.skip', ...
function leafKeys(node, prefix = '') {
    return Object.entries(node).flatMap(([key, value]) =>
        typeof value === 'object' ? leafKeys(value, `${prefix}${key}.`) : [`${prefix}${key}`]
    );
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
                assert.ok(dialogue.lines.every(line => line.trim()), `« ${id} » : réplique vide`);
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
