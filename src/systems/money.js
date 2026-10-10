// Salaire : chaque journée réussie rapporte dailyPay, réduit selon le temps passé
// sous le seuil de travail. Une journée perdue (game over) ne rapporte rien.
import { state, getLevel } from '../core/state.js';
import { computeDayPay } from '../core/rules.js';
import { renderMoney } from '../ui/hud.js';

// Appelée à chaque tick de l'horloge
export function trackPay() {
    const level = getLevel();
    if (state.work >= level.lowWorkThreshold) return;

    const before = computeDayPay(level, state.lowWorkTicks);
    state.lowWorkTicks++;
    // Signaler chaque euro perdu
    renderMoney({ lostPay: computeDayPay(level, state.lowWorkTicks) < before });
}

// Fin de journée réussie : le salaire du jour est ajouté au total
export function collectDayPay() {
    const pay = computeDayPay(getLevel(), state.lowWorkTicks);
    state.totalMoney += pay;
    renderMoney();
    return pay;
}
