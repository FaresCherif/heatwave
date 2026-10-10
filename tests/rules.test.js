// Tests des règles du jeu (node:test, sans dépendance) : npm test
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
    clampGauge, heatGainAt, isOverheated, workGain, isValidAlternation,
    advanceTime, getGameOverReason, getDayTicks, computeDayPay, workBarColor,
    formatTime, minutesUntil
} from '../src/core/rules.js';
import { LEVELS } from '../src/config/levels.js';

const level = {
    startHour: 13, endHour: 18,
    heatMorning: 1, heatAfternoon: 4,
    workPerPress: 1, overheatThreshold: 70, overheatWorkFactor: 0.5,
    dailyPay: 100, lowWorkThreshold: 50
};

describe('jauges', () => {
    test('restent entre 0 et 100', () => {
        assert.equal(clampGauge(-5), 0);
        assert.equal(clampGauge(42), 42);
        assert.equal(clampGauge(130), 100);
    });
});

describe('chaleur', () => {
    test('monte plus vite à partir de 12h', () => {
        assert.equal(heatGainAt(11, level), 1);
        assert.equal(heatGainAt(12, level), 4);
    });

    test('surchauffe à partir du seuil', () => {
        assert.equal(isOverheated(69, level), false);
        assert.equal(isOverheated(70, level), true);
    });
});

describe('travail', () => {
    test('rapporte moins en surchauffe', () => {
        assert.equal(workGain(20, level), 1);
        assert.equal(workGain(80, level), 0.5);
    });
});

describe('ventilation', () => {
    test('accepte n\'importe quelle flèche au premier appui', () => {
        assert.equal(isValidAlternation(null, 'left'), true);
        assert.equal(isValidAlternation(null, 'right'), true);
    });

    test('exige d\'alterner les flèches', () => {
        assert.equal(isValidAlternation('left', 'right'), true);
        assert.equal(isValidAlternation('left', 'left'), false);
    });
});

describe('horloge', () => {
    test('avance de 5 minutes par tick', () => {
        assert.deepEqual(advanceTime(13, 0), { hour: 13, minute: 5 });
    });

    test('passe à l\'heure suivante', () => {
        assert.deepEqual(advanceTime(13, 55), { hour: 14, minute: 0 });
    });

    test('compte 12 ticks par heure de journée', () => {
        assert.equal(getDayTicks(level), 60);
    });

    test('formate l\'heure sur deux chiffres', () => {
        assert.equal(formatTime(9, 5), '09:05');
        assert.equal(formatTime(16), '16:00');
    });

    test('compte les minutes avant une heure limite', () => {
        assert.equal(minutesUntil(15, 30, 16), 30);
        assert.equal(minutesUntil(16, 0, 16), 0);
        assert.equal(minutesUntil(16, 5, 16), -5);
    });
});

describe('fin de partie', () => {
    test('continue tant que les jauges sont correctes', () => {
        assert.equal(getGameOverReason(50, 50), null);
    });

    test('perdue à 100 % de chaleur', () => {
        assert.match(getGameOverReason(50, 100), /chaud/);
    });

    test('perdue à 0 % de travail', () => {
        assert.match(getGameOverReason(0, 50), /objectifs/);
    });
});

describe('salaire', () => {
    test('complet sans temps sous le seuil', () => {
        assert.equal(computeDayPay(level, 0), 100);
    });

    test('proportionnel au temps passé sous le seuil', () => {
        assert.equal(computeDayPay(level, 30), 50);
        assert.equal(computeDayPay(level, 15), 75);
    });

    test('jamais négatif', () => {
        assert.equal(computeDayPay(level, 999), 0);
    });

    test('la barre de travail change de couleur selon les seuils', () => {
        assert.equal(workBarColor(80, level), 'hsl(130, 70%, 45%)');
        assert.equal(workBarColor(40, level), 'hsl(30, 95%, 50%)');
        assert.equal(workBarColor(20, level), 'hsl(0, 85%, 50%)');
    });
});

describe('configuration des niveaux', () => {
    test('chaque niveau a une journée valide', () => {
        for (const { name, startHour, endHour } of LEVELS) {
            assert.ok(startHour < endHour, `${name} : début avant la fin`);
        }
    });

    test('chaque niveau a ses seuils entre 0 et 100', () => {
        for (const { name, overheatThreshold, lowWorkThreshold } of LEVELS) {
            assert.ok(overheatThreshold > 0 && overheatThreshold < 100, `${name} : seuil de surchauffe`);
            assert.ok(lowWorkThreshold > 0 && lowWorkThreshold < 100, `${name} : seuil de salaire`);
        }
    });

    test('l\'échéance de la fiche employé tombe pendant la journée', () => {
        for (const { name, startHour, endHour, employeeForm } of LEVELS.filter(l => l.employeeForm)) {
            const { deadlineHour } = employeeForm;
            assert.ok(deadlineHour > startHour && deadlineHour <= endHour, `${name} : échéance ${deadlineHour}h`);
        }
    });
});
