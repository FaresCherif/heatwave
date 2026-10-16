// Humeur du patron : il envoie des messages à heures fixes, sans bloquer le jeu.
// Le joueur choisit une des 3 réponses avant la fin du délai ; l'humeur monte ou baisse.
// À 0, c'est le licenciement (vérifié par game.js via 'stats-changed').
import { state, getLevel, isTimeRunning } from '../core/state.js';
import { clampGauge, toMinutes, MINUTES_PER_TICK } from '../core/rules.js';
import { emit } from '../core/events.js';
import { showFloatingText } from '../ui/effects.js';
import { getBossMessages, t, formatNumber } from '../i18n/index.js';

const container = document.getElementById('bossMessages');

/** @type {{text: string, answers: string[]}[]} */
let pool = [];      // Messages de la journée, tirés au hasard
let sentCount = 0;  // Messages déjà envoyés
/** @type {{element: HTMLElement, timeLeft: number}[]} */
let active = [];    // Messages en attente de réponse (timeLeft en minutes de jeu)

function getConfig() {
    return getLevel().bossMood;
}

function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

/** Début de journée : humeur de départ, messages tirés au hasard */
export function startBossMood() {
    stopBossMood();
    const config = getConfig();
    state.bossMood = config ? config.start : null;
    if (config) pool = shuffle(getBossMessages()).slice(0, config.messageHours.length);
}

/** Retire les messages affichés (journée terminée ou relancée) */
export function stopBossMood() {
    active.forEach(item => item.element.remove());
    active = [];
    pool = [];
    sentCount = 0;
}

// Appelée à chaque tick : nouveaux messages et délais de réponse
export function updateBossMood() {
    const config = getConfig();
    if (!config) return;

    // Messages sans réponse à temps : l'humeur baisse
    const expired = active.filter(item => (item.timeLeft -= MINUTES_PER_TICK) <= 0);
    for (const item of expired) {
        changeMood(-config.missPenalty, item.element);
        removeMessage(item);
        if (!isTimeRunning()) return;  // Licencié : la journée est terminée
    }

    active.forEach(renderCountdown);

    const now = toMinutes(state.hour, state.minute);
    while (sentCount < pool.length && toMinutes(config.messageHours[sentCount]) <= now) {
        sendMessage(pool[sentCount]);
        sentCount++;
    }
}

function sendMessage({ text, answers }) {
    const config = getConfig();
    const element = document.createElement('div');
    element.className = 'boss-message';
    element.innerHTML = `
        <div class="boss-message-sender"></div>
        <p></p>
        <div class="boss-message-answers"></div>
        <div class="boss-message-timer"><div></div></div>`;
    element.querySelector('.boss-message-sender').textContent = t('mood.sender');
    element.querySelector('p').textContent = text;

    const item = { element, timeLeft: config.replyMinutes };

    // Réponses mélangées : la bonne n'est pas toujours la première
    const buttons = shuffle(answers.map((answer, quality) => ({ answer, quality }))).map(({ answer, quality }) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = answer;
        // Le clic ne prend pas le focus : une saisie en cours (recopie, fiche RH) continue
        button.addEventListener('mousedown', event => event.preventDefault());
        button.addEventListener('click', () => {
            button.blur();
            if (!isTimeRunning()) return;
            changeMood(config.answerMood[quality], element);
            removeMessage(item);
        });
        return button;
    });
    element.querySelector('.boss-message-answers').append(...buttons);

    container.appendChild(element);
    active.push(item);
    renderCountdown(item);
}

// Barre du temps restant pour répondre
function renderCountdown(item) {
    const ratio = Math.max(0, item.timeLeft) / getConfig().replyMinutes;
    item.element.querySelector('.boss-message-timer div').style.width = `${ratio * 100}%`;
    item.element.classList.toggle('urgent', ratio <= 0.34);
}

function removeMessage(item) {
    active = active.filter(other => other !== item);
    item.element.remove();
}

/**
 * Modifie l'humeur du patron (aussi utilisé par la visio).
 * @param {number} amount
 * @param {HTMLElement} anchor  Élément au-dessus duquel afficher la variation
 */
export function changeMood(amount, anchor) {
    if (state.bossMood === null) return;
    state.bossMood = clampGauge(state.bossMood + amount);

    const text = amount === 0 ? '😐' : `${amount > 0 ? '+' : ''}${formatNumber(amount)} ${amount > 0 ? '😊' : '😠'}`;
    showFloatingText(text, anchor, amount < 0 ? 'loss' : 'gain');
    emit('stats-changed');
}
