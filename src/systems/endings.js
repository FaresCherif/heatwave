// Fins de la partie : à la fin du dernier niveau, le joueur choisit parmi les fins débloquées
// (écran sauté s'il n'y en a qu'une), puis le récit s'affiche paragraphe par paragraphe.
// playEnding() renvoie une promesse résolue quand le joueur clique sur « Rejouer ».
import { state } from '../core/state.js';
import { getUnlockedEndings } from '../core/endings.js';
import { ENDINGS } from '../config/endings.js';
import { applyTranslations, t, getLocaleValue } from '../i18n/index.js';
import { showScreen, hideScreen } from '../ui/screens.js';

const TYPING_MS = 20;  // Délai entre deux lettres de l'effet machine à écrire

const els = {
    choice: document.getElementById('endingChoice'),
    choicePay: document.getElementById('endingChoicePay'),
    choices: document.getElementById('endingChoices'),
    story: document.getElementById('endingStory'),
    title: document.getElementById('endingTitle'),
    text: document.getElementById('endingText'),
    next: document.getElementById('endingNext')
};

/** @type {{paragraphs: string[], index: number, typingId: number|null, resolve: () => void}|null} */
let current = null;

/**
 * @param {string} payText  Salaire du dernier jour, affiché sur l'écran de choix
 * @returns {Promise<void>}
 */
export function playEnding(payText) {
    return new Promise(resolve => {
        const unlocked = getUnlockedEndings(ENDINGS, state.ownedItems, state.totalMoney);
        if (unlocked.length === 1) {
            showStory(unlocked[0], resolve);
            return;
        }

        applyTranslations(els.choice);
        els.choicePay.textContent = payText;
        els.choices.replaceChildren(...unlocked.map(ending => {
            const button = document.createElement('button');
            button.textContent = t(`endings.list.${ending.id}.choice`);
            button.addEventListener('click', () => {
                button.blur();
                hideScreen('endingChoice');
                showStory(ending, resolve);
            });
            return button;
        }));
        showScreen('endingChoice');
    });
}

function showStory(ending, resolve) {
    els.title.textContent = t(`endings.list.${ending.id}.title`);
    els.text.replaceChildren();
    current = { paragraphs: getLocaleValue(`endings.list.${ending.id}.text`), index: -1, typingId: null, resolve };
    showScreen('endingStory');
    showNextParagraph();
}

// Paragraphe suivant, tapé lettre par lettre
function showNextParagraph() {
    current.index++;
    const text = current.paragraphs[current.index];
    const paragraph = document.createElement('p');
    els.text.appendChild(paragraph);
    els.next.textContent = t(isLastParagraph() ? 'endings.replay' : 'endings.next');

    let shown = 0;
    current.typingId = setInterval(() => {
        shown++;
        paragraph.textContent = text.slice(0, shown);
        if (shown >= text.length) stopTyping();
    }, TYPING_MS);
}

function stopTyping() {
    clearInterval(current.typingId);
    current.typingId = null;
}

function isLastParagraph() {
    return current.index === current.paragraphs.length - 1;
}

// Bouton : termine le paragraphe en cours, sinon passe au suivant, puis rejoue la partie
els.next.addEventListener('click', () => {
    els.next.blur();
    if (!current) return;

    if (current.typingId !== null) {
        stopTyping();
        els.text.lastElementChild.textContent = current.paragraphs[current.index];
    } else if (!isLastParagraph()) {
        showNextParagraph();
    } else {
        hideScreen('endingStory');
        const { resolve } = current;
        current = null;
        resolve();
    }
});
