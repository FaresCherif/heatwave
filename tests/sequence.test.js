// Tests de la détection du code secret
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { createSequenceDetector, LEVEL_SELECT_CODE } from '../src/core/sequence.js';

// Tape une suite de touches, renvoie le résultat de la dernière
const type = (detector, keys) => keys.map(detector).at(-1);

describe('code secret', () => {
    test('reconnu quand il est tapé en entier', () => {
        assert.equal(type(createSequenceDetector(LEVEL_SELECT_CODE), LEVEL_SELECT_CODE), true);
    });

    test('non reconnu avant la dernière touche', () => {
        const detector = createSequenceDetector(LEVEL_SELECT_CODE);
        assert.equal(type(detector, LEVEL_SELECT_CODE.slice(0, -1)), false);
    });

    test('tolère un faux départ', () => {
        const detector = createSequenceDetector(LEVEL_SELECT_CODE);
        assert.equal(type(detector, ['ArrowUp', 'KeyA', 'ArrowUp', ...LEVEL_SELECT_CODE]), true);
    });

    test('tolère une flèche du haut en trop au début', () => {
        const detector = createSequenceDetector(LEVEL_SELECT_CODE);
        assert.equal(type(detector, ['ArrowUp', ...LEVEL_SELECT_CODE]), true);
    });

    test('rejette une erreur au milieu', () => {
        const detector = createSequenceDetector(LEVEL_SELECT_CODE);
        const wrong = [...LEVEL_SELECT_CODE];
        wrong[4] = 'ArrowRight';
        assert.equal(type(detector, wrong), false);
    });

    test('doit être retapé en entier après avoir été reconnu', () => {
        const detector = createSequenceDetector(LEVEL_SELECT_CODE);
        type(detector, LEVEL_SELECT_CODE);
        assert.equal(detector('Enter'), false);
    });
});
