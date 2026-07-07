let gameStarted = false;

function startGame() {
    restartGame();
}

function restartGame() {
    stopClock();
    resetGameState();
    gameStarted = true;
    gamePaused = false;

    const startMenu = document.getElementById('startMenu');
    const pauseMenu = document.getElementById('pauseMenu');

    if (startMenu) startMenu.classList.add('hidden');
    if (pauseMenu) pauseMenu.classList.add('hidden');

    initializeGameEvents();
    startClock();
}

// Attendre que la page soit chargée
document.addEventListener('DOMContentLoaded', function() {
    // Le menu de démarrage est affiché par défaut
});
