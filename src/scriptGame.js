function resetGameState() {
    currentHour = 8;
    currentMinute = 0;
    workLevel = 100;
    heatLevel = 0;
    gameOver = false;
    gamePaused = false;
    currentMode = 'idle';
    lastArrowKey = null;

    stopBubbleSystem();

    const startMenu = document.getElementById('startMenu');
    const pauseMenu = document.getElementById('pauseMenu');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const gameOverReason = document.getElementById('gameOverReason');
    const clock = document.querySelector('.clock');

    if (startMenu) startMenu.classList.add('hidden');
    if (pauseMenu) pauseMenu.classList.add('hidden');
    if (gameOverScreen) gameOverScreen.classList.remove('show');
    if (gameOverReason) gameOverReason.textContent = '';
    if (clock) clock.textContent = '08:00';

    updateBars();
    updateModeIndicator();
}

function triggerGameOver(reason) {
    gameOver = true;
    const screen = document.getElementById('gameOverScreen');
    document.getElementById('gameOverReason').textContent = reason;
    screen.classList.add('show');
}

function checkGameOver() {
    if (heatLevel >= 100) {
        triggerGameOver("Trop chaud ! Vous avez fini en merguez.");
        return true;
    }
    if (workLevel <= 0) {
        triggerGameOver("Du balais ! Vous n'avez pas atteint vos objectifs");
        return true;
    }
    return false;
}



