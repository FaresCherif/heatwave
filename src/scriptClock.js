let currentHour = 8;
let currentMinute = 0;
let workLevel = 100;      // Commence à 100%
let heatLevel = 0;        // Commence à 0%
let gameOver = false;  // ← Ajouter cette ligne
let gamePaused = false;
let currentMode = 'idle';  // ← Remplacer workMode par une string
let clockIntervalId = null;

function renderClock() {
    const clock = document.querySelector('.clock');
    if (!clock) return;

    const time = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
    clock.textContent = time;
}

function updateClock() {
    // Le temps est figé pendant le tutoriel
    if (gameOver || !gameStarted || gamePaused || tutorialActive) {
        renderClock();
        return;
    }

    renderClock();

    const level = getCurrentLevel();

    // Le travail baisse à chaque tick
    workLevel = Math.max(0, workLevel - level.workDecay);

    // Chaleur augmente plus vite après 12h
    if (currentHour >= 12) {
        heatLevel = Math.min(100, heatLevel + level.heatAfternoon);
    } else {
        heatLevel = Math.min(100, heatLevel + level.heatMorning);
    }

    // Mise à jour des barres
    updateBars();

    // Vérifier le game over    
    if (checkGameOver()) return;

    // Avance de 5 minutes
    currentMinute += 5;
    if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour += 1;
    }

    // Fin de journée à 18:00 : niveau réussi
    if (currentHour >= 18) {
        renderClock();
        triggerLevelComplete();
    }
}

function startClock() {
    if (clockIntervalId !== null) {
        clearInterval(clockIntervalId);
    }

    clockIntervalId = setInterval(updateClock, 1000);
    updateClock();
}

function stopClock() {
    if (clockIntervalId !== null) {
        clearInterval(clockIntervalId);
        clockIntervalId = null;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    startClock();
});