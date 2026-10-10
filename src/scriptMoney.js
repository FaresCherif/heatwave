// Salaire : chaque journée réussie rapporte dailyPay,
// réduit en proportion du temps passé sous le seuil de travail (lowWorkThreshold).
// Une journée perdue (game over) ne rapporte rien.
let totalMoney = 0;     // Argent cumulé sur la partie
let lowWorkTicks = 0;   // Ticks passés sous le seuil pendant la journée

// Nombre de ticks dans la journée (un tick = 5 minutes)
function getDayTicks() {
    const level = getCurrentLevel();
    return (level.endHour - level.startHour) * 12;
}

function getDayPay() {
    const ratio = Math.min(1, lowWorkTicks / getDayTicks());
    return Math.round(getCurrentLevel().dailyPay * (1 - ratio));
}

// Appelée à chaque tick de l'horloge
function trackPay() {
    if (workLevel >= getCurrentLevel().lowWorkThreshold) return;

    const before = getDayPay();
    lowWorkTicks++;
    renderMoney();

    // Signaler chaque euro perdu
    if (getDayPay() < before) {
        playEffect(document.querySelector('.day-pay'), 'pay-loss');
    }
}

function resetDayPay() {
    lowWorkTicks = 0;
    renderMoney();
}

// Nouvelle partie
function resetMoney() {
    totalMoney = 0;
}

// Fin de journée réussie : le salaire du jour est ajouté au total
function collectDayPay() {
    const pay = getDayPay();
    totalMoney += pay;
    renderMoney();
    return pay;
}

function renderMoney() {
    document.querySelector('.day-pay').textContent = `💰 ${getDayPay()} €`;
    document.querySelector('.total-money').textContent = `Total : ${totalMoney} €`;
}
