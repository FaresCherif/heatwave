// Contrôles tactiles : boutons à l'écran qui remplacent le clavier sur téléphone.
// Chaque bouton envoie sa touche (Espace, flèches, Échap) : le travail, l'éventail, le disjoncteur,
// les dialogues et la pause réagissent comme au clavier. Travailler et s'éventer choisissent aussi le mode,
// pour ne pas avoir à toucher le personnage ou l'éventail avant.
import { state } from './core/state.js';
import { setMode } from './input.js';

const breaker = document.getElementById('breaker');

// Mode nécessaire à chaque touche
const MODES = { Space: 'work', ArrowLeft: 'cool', ArrowRight: 'cool' };

function sendKey(code) {
    // Envoyée depuis body : input.js teste event.target.closest(), absent sur document
    document.body.dispatchEvent(new KeyboardEvent('keydown', { code, key: code, bubbles: true, cancelable: true }));
}

function press(code) {
    const mode = MODES[code];
    // Disjoncteur ouvert : ← → servent à la combinaison, sans passer en mode éventail (qui le refermerait)
    const typingCode = breaker.classList.contains('open') && code !== 'Space';
    if (mode && state.mode !== mode && !typingCode) setMode(mode);
    sendKey(code);
}

export function initTouchControls() {
    document.querySelectorAll('#touchControls [data-key]').forEach(button => {
        // pointerdown plutôt que click : réaction immédiate quand on tape vite.
        // preventDefault : le bouton ne prend pas le focus (une saisie en cours continue)
        button.addEventListener('pointerdown', event => {
            event.preventDefault();
            press(button.dataset.key);
        });
    });
}
