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
    if (gameOver || !gameStarted || gamePaused) {
        renderClock();
        return;
    }

    renderClock();

    // Travail augmente graduellement (0 à 100% de 8h à 18h)
    workLevel = Math.min(100, workLevel - 5);

    // Chaleur augmente plus vite après 12h
    if (currentHour >= 12) {
        heatLevel = Math.min(100, heatLevel + 8);
    } else {
        heatLevel = Math.min(100, heatLevel + 2);
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

    // Boucle à 08:00 quand on atteint 18:00
    if (currentHour >= 18) {
        currentHour = 8;
        currentMinute = 0;
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