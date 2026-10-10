// Appels téléphoniques : un téléphone sonne et une bulle affiche les répliques une par une.
// Réutilisable : playDialogue() renvoie une promesse résolue quand le joueur raccroche.
// Pendant l'appel (phase 'dialogue'), le temps est figé et les contrôles du jeu inactifs.
import { state } from '../core/state.js';
import { t } from '../i18n/index.js';

const TYPING_MS = 25;  // Délai entre deux lettres de l'effet machine à écrire

const els = {
    panel: document.getElementById('dialogue'),
    caller: document.getElementById('dialogueCaller'),
    text: document.getElementById('dialogueText'),
    hint: document.getElementById('dialogueHint'),
    skip: document.getElementById('dialogueSkip')
};

let current = null;  // { dialogue, lineIndex, typingId, resolve }

/**
 * @param {import('../i18n/index.js').Dialogue} dialogue
 * @returns {Promise<void>}
 */
export function playDialogue(dialogue) {
    // Un appel en cours est coupé par le nouveau
    if (current) finish();

    state.phase = 'dialogue';
    els.caller.textContent = `📞 ${dialogue.caller}`;
    els.skip.textContent = t('dialogue.skip');
    els.panel.classList.remove('hidden');

    return new Promise(resolve => {
        current = { dialogue, lineIndex: 0, typingId: null, resolve };
        showLine();
    });
}

function showLine() {
    const { dialogue, lineIndex } = current;
    const line = dialogue.lines[lineIndex];
    const isLast = lineIndex === dialogue.lines.length - 1;
    els.hint.textContent = t(isLast ? 'dialogue.hangUp' : 'dialogue.next');

    // Effet machine à écrire, lettre par lettre
    let shown = 0;
    els.text.textContent = '';
    els.panel.classList.add('typing');
    current.typingId = setInterval(() => {
        shown++;
        els.text.textContent = line.slice(0, shown);
        if (shown >= line.length) stopTyping();
    }, TYPING_MS);
}

function stopTyping() {
    clearInterval(current.typingId);
    current.typingId = null;
    els.text.textContent = current.dialogue.lines[current.lineIndex];
    els.panel.classList.remove('typing');
}

// Clic ou touche : termine la réplique en cours d'écriture, sinon passe à la suivante
function advance() {
    if (!current) return;

    if (current.typingId !== null) {
        stopTyping();
    } else if (current.lineIndex + 1 < current.dialogue.lines.length) {
        current.lineIndex++;
        showLine();
    } else {
        finish();
    }
}

// Fin de l'appel (dernière réplique ou bouton Passer)
function finish() {
    if (!current) return;

    clearInterval(current.typingId);
    const { resolve } = current;
    current = null;
    els.panel.classList.add('hidden');
    resolve();
}

els.panel.addEventListener('click', event => {
    event.stopPropagation();  // Le clic ne doit pas atteindre la scène
    if (event.target === els.skip) {
        els.skip.blur();
        finish();
    } else {
        advance();
    }
});

document.addEventListener('keydown', event => {
    if (!current) return;
    if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        advance();
    }
});
