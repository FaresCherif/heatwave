// Easter egg : sur le menu de démarrage, le code ↑ ↑ ↓ ↓ ← → ← → Entrée
// ouvre un écran secret pour commencer la partie au niveau de son choix.
import { state } from '../core/state.js';
import { createSequenceDetector, LEVEL_SELECT_CODE } from '../core/sequence.js';
import { startGame } from '../core/game.js';
import { LEVELS } from '../config/levels.js';
import { applyTranslations } from '../i18n/index.js';
import { showScreen, hideScreen } from '../ui/screens.js';

const els = {
    screen: document.getElementById('levelSelect'),
    levels: document.getElementById('levelSelectList'),
    back: document.getElementById('levelSelectBack')
};

const isCodeComplete = createSequenceDetector(LEVEL_SELECT_CODE);

function open() {
    applyTranslations(els.screen);
    // Un bouton par niveau, dans l'ordre de levels.js
    els.levels.replaceChildren(...LEVELS.map((level, index) => {
        const button = document.createElement('button');
        button.textContent = level.name;
        button.addEventListener('click', () => {
            button.blur();
            hideScreen('levelSelect');
            startGame(index);
        });
        return button;
    }));
    hideScreen('start');
    showScreen('levelSelect');
}

export function initLevelSelect() {
    document.addEventListener('keydown', event => {
        // Uniquement sur le menu de démarrage
        if (state.phase !== 'menu') return;

        const key = event.code === 'NumpadEnter' ? 'Enter' : event.code;
        if (isCodeComplete(key)) {
            event.preventDefault();
            open();
        }
    });

    els.back.addEventListener('click', () => {
        els.back.blur();
        hideScreen('levelSelect');
        showScreen('start');
    });
}
