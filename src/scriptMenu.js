let gameStarted = false;

function startGame() {
    currentLevelIndex = 0;
    resetMoney();
    restartGame();
}

// Bouton de l'écran de fin de niveau
function nextLevel() {
    // Après la victoire, REJOUER relance une partie complète
    if (isLastLevel()) {
        currentLevelIndex = 0;
        resetMoney();
    } else {
        currentLevelIndex++;
    }
    restartGame();
}

// Relance le niveau en cours
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
    if (shouldShowTutorial()) startTutorial();
    startClock();
    startBubbleSystem();
}

// Attendre que la page soit chargée
document.addEventListener('DOMContentLoaded', function() {
    // Le menu de démarrage est affiché par défaut
});
