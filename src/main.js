// Point d'entrée : branche les boutons des menus et les contrôles du jeu
import { startGame, nextLevel, restartLevel, resumeGame } from './core/game.js';
import { nextTutorialStep, endTutorial } from './systems/tutorial.js';
import { initInput } from './input.js';

// Le focus est retiré après le clic : sinon la touche Espace (travail)
// réactiverait le bouton
function bindButton(id, handler) {
    const button = document.getElementById(id);
    button.addEventListener('click', () => {
        button.blur();
        handler();
    });
}

bindButton('startButton', startGame);
bindButton('resumeButton', resumeGame);
bindButton('restartButton', restartLevel);
bindButton('levelMenuButton', nextLevel);
bindButton('retryButton', restartLevel);
bindButton('tutorialNext', nextTutorialStep);
bindButton('tutorialSkip', endTutorial);

initInput();
