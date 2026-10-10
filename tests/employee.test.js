// Tests de la fiche du nouvel employé
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { parseEmployee } from '../src/core/employee.js';

const complete = { name: '  Jean Dupont ', sex: 'male', age: '32', love: '1', suicide: '4', toilets: '5' };

describe('fiche employé', () => {
    test('convertit une fiche complète', () => {
        assert.deepEqual(parseEmployee(complete), {
            name: 'Jean Dupont', sex: 'male', age: 32, love: 1, suicide: 4, toilets: 5
        });
    });

    test('refuse un nom vide ou fait d\'espaces', () => {
        assert.equal(parseEmployee({ ...complete, name: '   ' }), null);
    });

    test('refuse un sexe inconnu', () => {
        assert.equal(parseEmployee({ ...complete, sex: 'robot' }), null);
    });

    test('refuse un âge absent ou hors limites', () => {
        assert.equal(parseEmployee({ ...complete, age: '' }), null);
        assert.equal(parseEmployee({ ...complete, age: '12' }), null);
        assert.equal(parseEmployee({ ...complete, age: '30.5' }), null);
    });

    test('exige une note de 1 à 5 pour chaque critère', () => {
        const { toilets, ...withoutToilets } = complete;
        assert.equal(parseEmployee(withoutToilets), null);
        assert.equal(parseEmployee({ ...complete, love: '6' }), null);
    });
});
