let gameStarted = false;

function startGame() {
    gameStarted = true;
    gamePaused = false;

    const startMenu = document.getElementById('startMenu');
    const pauseMenu = document.getElementById('pauseMenu');

    startMenu.classList.add('hidden');
    if (pauseMenu) pauseMenu.classList.add('hidden');

    initializeGameEvents();
}

// Attendre que la page soit chargée
document.addEventListener('DOMContentLoaded', function() {
    // Le menu de démarrage est affiché par défaut
});
