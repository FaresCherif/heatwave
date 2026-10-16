// Appels urgents : des téléphones apparaissent et éclatent s'ils ne sont pas cliqués à temps
import { state, getLevel, isTimeRunning } from '../core/state.js';
import { clampGauge } from '../core/rules.js';
import { emit } from '../core/events.js';
import { showFloatingText } from '../ui/effects.js';
import { t, formatNumber } from '../i18n/index.js';

const background = document.querySelector('.background');

let activeBubbles = [];  // { element, timeLeft }
let spawnTimeoutId = null;

function getConfig() {
    return getLevel().bubbles;
}

function scheduleNextBubble() {
    clearTimeout(spawnTimeoutId);

    // Nouveau délai aléatoire à chaque tentative
    const config = getConfig();
    const delay = config.minDelay + Math.random() * (config.maxDelay - config.minDelay);
    spawnTimeoutId = setTimeout(spawnBubble, delay);
}

// Position dans la partie visible du décor (les bords peuvent être rognés),
// à gauche ou à droite du poste de travail, jamais dessus
function randomPosition() {
    const rect = background.getBoundingClientRect();
    const visibleLeft = Math.max(0, -rect.left) / rect.width * 100;
    const visibleTop = Math.max(0, -rect.top) / rect.height * 100;
    const visibleWidth = 100 - 2 * visibleLeft;
    const visibleHeight = 100 - 2 * visibleTop;

    const side = Math.random() < 0.5 ? 0.08 : 0.72;
    return {
        left: visibleLeft + visibleWidth * (side + Math.random() * 0.2),
        // Pas trop haut pour ne pas passer sous l'interface du haut
        top: visibleTop + visibleHeight * (0.3 + Math.random() * 0.55)
    };
}

function spawnBubble() {
    const config = getConfig();
    if (!isTimeRunning() || activeBubbles.length >= config.maxCount) {
        scheduleNextBubble();
        return;
    }

    const bubble = document.createElement('button');
    bubble.type = 'button';
    bubble.className = 'task-bubble';
    bubble.title = t('bubble.title');
    bubble.innerHTML = '<img class="bubble-icon" src="src/images/phone.png" alt="">';
    bubble.querySelector('img').alt = t('images.phone');

    const { left, top } = randomPosition();
    bubble.style.left = `${left}%`;
    bubble.style.top = `${top}%`;

    // Le clic ne prend pas le focus : une saisie en cours (recopie, fiche RH) continue
    bubble.addEventListener('mousedown', event => event.preventDefault());
    bubble.addEventListener('click', event => {
        event.stopPropagation();  // Ne pas repasser en mode repos
        // Une bulle déjà éclatée ne rapporte rien
        if (bubble.classList.contains('burst')) return;

        state.work = clampGauge(state.work + config.reward);
        emit('stats-changed');
        showFloatingText(`+${formatNumber(config.reward)}`, bubble, 'gain');
        removeBubble(bubble);
    });

    background.appendChild(bubble);
    activeBubbles.push({ element: bubble, timeLeft: config.lifetime });
    // Lancer l'anneau après l'affichage pour que la transition démarre
    requestAnimationFrame(() => renderCountdown(bubble, config.lifetime));
    scheduleNextBubble();
}

// Anneau de compte à rebours : proportion du temps restant
function renderCountdown(bubble, timeLeft) {
    bubble.style.setProperty('--progress', Math.max(0, timeLeft - 1) / getConfig().lifetime);
}

function removeBubble(element) {
    activeBubbles = activeBubbles.filter(item => item.element !== element);
    element.remove();
}

function burstBubble(element) {
    const penalty = getConfig().penalty;
    showFloatingText(`-${formatNumber(penalty)}`, element, 'loss');
    element.classList.add('burst');
    element.innerHTML = '<span>💥</span>';
    setTimeout(() => removeBubble(element), 180);

    state.work = clampGauge(state.work - penalty);
    emit('stats-changed');
}

// Appelée chaque seconde par la boucle de jeu
export function updateBubbles() {
    if (!getConfig() || !isTimeRunning()) return;

    const expired = [];
    activeBubbles = activeBubbles.filter(item => {
        item.timeLeft -= 1;
        renderCountdown(item.element, item.timeLeft);

        if (item.timeLeft <= 0) {
            expired.push(item.element);
            return false;
        }
        return true;
    });

    // Après le parcours : un éclatement peut provoquer le game over et vider la liste
    expired.forEach(burstBubble);
}

export function startBubbles() {
    stopBubbles();
    // Pas d'appels si le niveau ne les active pas
    if (getConfig()) scheduleNextBubble();
}

export function stopBubbles() {
    clearTimeout(spawnTimeoutId);
    spawnTimeoutId = null;
    activeBubbles.forEach(item => item.element.remove());
    activeBubbles = [];
}
