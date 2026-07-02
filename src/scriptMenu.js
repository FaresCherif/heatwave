let gameStarted = false;

function startGame() {
    gameStarted = true;
    const startMenu = document.getElementById('startMenu');
    startMenu.classList.add('hidden');
    initializeGameEvents();
}

// Attendre que la page soit chargée
document.addEventListener('DOMContentLoaded', function() {
    // Le menu de démarrage est affiché par défaut
});
