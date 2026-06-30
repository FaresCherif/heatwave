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



