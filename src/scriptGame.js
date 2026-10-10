function resetGameState() {
    currentHour = getCurrentLevel().startHour;
    currentMinute = 0;
    workLevel = 100;
    heatLevel = 0;
    gameOver = false;
    gamePaused = false;
    currentMode = 'idle';
    lastArrowKey = null;

    stopBubbleSystem();

    // Un tutoriel interrompu (redémarrage) sera relancé par restartGame
    tutorialActive = false;
    hideTutorial();

    const startMenu = document.getElementById('startMenu');
    const pauseMenu = document.getElementById('pauseMenu');
    const gameOverScreen = document.getElementById('gameOverScreen');
    const gameOverReason = document.getElementById('gameOverReason');
    const levelMenu = document.getElementById('levelMenu');
    const levelLabel = document.querySelector('.level-label');

    if (startMenu) startMenu.classList.add('hidden');
    if (pauseMenu) pauseMenu.classList.add('hidden');
    if (gameOverScreen) gameOverScreen.classList.remove('show');
    if (gameOverReason) gameOverReason.textContent = '';
    if (levelMenu) levelMenu.classList.add('hidden');
    if (levelLabel) levelLabel.textContent = getCurrentLevel().name;
    renderClock();

    updateBars();
    updateModeIndicator();
}

function triggerLevelComplete() {
    // gameOver fige le jeu (horloge, clavier, bulles)
    gameOver = true;
    stopBubbleSystem();

    const level = getCurrentLevel();
    const levelMenu = document.getElementById('levelMenu');
    const title = document.getElementById('levelMenuTitle');
    const text = document.getElementById('levelMenuText');
    const button = document.getElementById('levelMenuButton');

    if (isLastLevel()) {
        title.textContent = 'VICTOIRE';
        text.textContent = `${level.name} terminé ! Vous avez survécu à la canicule.`;
        button.textContent = 'REJOUER';
    } else {
        const next = LEVELS[currentLevelIndex + 1];
        title.textContent = `${level.name.toUpperCase()} TERMINÉ`;
        text.textContent = `Prochain : ${next.name}. ${next.description}`;
        button.textContent = 'NIVEAU SUIVANT';
    }

    levelMenu.classList.remove('hidden');
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



