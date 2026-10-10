// Écrans superposés au jeu : démarrage, pause, fin de niveau, game over

const screens = {
    start: document.getElementById('startMenu'),
    pause: document.getElementById('pauseMenu'),
    level: document.getElementById('levelMenu'),
    gameOver: document.getElementById('gameOverScreen')
};

const levelEls = {
    title: document.getElementById('levelMenuTitle'),
    pay: document.getElementById('levelMenuPay'),
    text: document.getElementById('levelMenuText'),
    button: document.getElementById('levelMenuButton')
};

/** @param {keyof typeof screens} name */
export function showScreen(name) {
    screens[name].classList.remove('hidden');
}

/** @param {keyof typeof screens} name */
export function hideScreen(name) {
    screens[name].classList.add('hidden');
}

export function hideAllScreens() {
    Object.keys(screens).forEach(hideScreen);
}

export function showLevelComplete({ title, pay, text, button }) {
    levelEls.title.textContent = title;
    levelEls.pay.textContent = pay;
    levelEls.text.textContent = text;
    levelEls.button.textContent = button;
    showScreen('level');
}

export function showGameOver(reason) {
    document.getElementById('gameOverReason').textContent = reason;
    showScreen('gameOver');
}
