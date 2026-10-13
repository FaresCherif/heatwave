// Easter egg : sur le menu de démarrage ou de pause, le code ↑ ↑ ↓ ↓ ← → ← → Entrée
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

// Menu depuis lequel l'écran a été ouvert, réaffiché par « Retour » : 'start' | 'pause'
let origin = null;

const isOpen = () => origin !== null;

function open(from) {
    origin = from;
    applyTranslations(els.screen);
    // Un bouton par niveau, dans l'ordre de levels.js
    els.levels.replaceChildren(...LEVELS.map((level, index) => {
        const button = document.createElement('button');
        button.textContent = level.name;
        button.addEventListener('click', () => {
            button.blur();
            hideScreen('levelSelect');
            origin = null;
            startGame(index);
        });
        return button;
    }));
    hideScreen(from);
    showScreen('levelSelect');
}

function back() {
    hideScreen('levelSelect');
    showScreen(origin);
    origin = null;
}

export function initLevelSelect() {
    // Phase de capture : passe avant les contrôles du jeu, pour qu'Échap
    // ferme cet écran au lieu de reprendre la partie derrière lui
    document.addEventListener('keydown', event => {
        if (isOpen()) {
            if (event.code === 'Escape') {
                event.preventDefault();
                event.stopPropagation();
                back();
            }
            return;
        }

        // Uniquement sur le menu de démarrage ou de pause
        const from = state.phase === 'menu' ? 'start' : state.paused ? 'pause' : null;
        if (!from) return;

        const key = event.code === 'NumpadEnter' ? 'Enter' : event.code;
        if (isCodeComplete(key)) {
            event.preventDefault();
            open(from);
        }
    }, { capture: true });

    els.back.addEventListener('click', () => {
        els.back.blur();
        back();
    });
}
