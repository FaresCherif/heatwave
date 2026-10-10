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
    }

    test('chaque appel d\'introduction de niveau existe', () => {
        for (const { name, intro } of LEVELS.filter(level => level.intro)) {
            assert.ok(reference.dialogues[intro], `${name} : dialogue « ${intro} » introuvable`);
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
