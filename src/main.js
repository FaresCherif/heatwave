// Point d'entrée : branche les boutons des menus et les contrôles du jeu
import { startGame, nextLevel, restartLevel, resumeGame, pauseGame } from './core/game.js';
import { nextTutorialStep, endTutorial } from './systems/tutorial.js';
import { initInput } from './input.js';
import { initLevelSelect } from './systems/levelSelect.js';
import { applyTranslations, getLanguage } from './i18n/index.js';

// Textes fixes de la page (data-i18n) dans la langue choisie
document.documentElement.lang = getLanguage();
applyTranslations();

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
bindButton('restartLevelButton', restartLevel);
bindButton('restartButton', () => startGame());
bindButton('levelMenuButton', nextLevel);
bindButton('retryButton', restartLevel);
bindButton('tutorialNext', nextTutorialStep);
bindButton('tutorialSkip', endTutorial);

// Pause automatique quand le joueur quitte le jeu (autre onglet, clic hors de l'iframe itch.io) :
// sinon l'horloge continue sans lui. La reprise reste manuelle, depuis le menu pause.
document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseGame();
});
window.addEventListener('blur', pauseGame);

initInput();
initLevelSelect();
