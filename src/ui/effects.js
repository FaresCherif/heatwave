// Effets visuels : zones interactives et retours d'action

const background = document.querySelector('.background');
const player = document.querySelector('.joueur');
const handfan = document.querySelector('.handfan');
const workZones = document.querySelectorAll('.bureau, .joueur, .computer');

// Texte flottant ("+1", "-1.5°"...) qui monte et disparaît au-dessus d'un élément
export function showFloatingText(text, anchorElement, type) {
    const bgRect = background.getBoundingClientRect();
    const rect = anchorElement.getBoundingClientRect();

    // Petit décalage aléatoire pour que les textes ne se superposent pas
    const offsetX = (Math.random() - 0.5) * rect.width * 0.3;

    const floating = document.createElement('div');
    floating.className = `floating-text ${type}`;
    floating.textContent = text;
    floating.style.left = `${rect.left - bgRect.left + rect.width / 2 + offsetX}px`;
    floating.style.top = `${rect.top - bgRect.top + rect.height * 0.2}px`;
    floating.addEventListener('animationend', () => floating.remove());

    background.appendChild(floating);
}

// Rejoue une animation CSS même si elle est déjà en cours
export function playEffect(element, className) {
    element.classList.remove(className);
    void element.offsetWidth;  // Force le navigateur à relancer l'animation
    element.classList.add(className);

    // Retirer la classe à la fin, sinon elle remplace le halo des zones
    element.addEventListener('animationend', () => element.classList.remove(className), { once: true });
}

// Met en avant les zones du mode actif
export function highlightZones(mode) {
    workZones.forEach(zone => zone.classList.toggle('selected', mode === 'work'));
    handfan.classList.toggle('selected', mode === 'cool');
}

function bumpStatBar(fillSelector) {
    playEffect(document.querySelector(fillSelector).closest('.stat-bar'), 'bump');
}

export function workEffect(amount, overheated) {
    // Texte orange en surchauffe pour montrer que le gain est réduit
    showFloatingText(`+${amount}`, player, overheated ? 'slow' : 'gain');
    playEffect(player, 'typing');
    bumpStatBar('.work-bar-fill');
}

export function coolEffect(amount, direction) {
    showFloatingText(`-${amount}°`, handfan, 'cool');
    handfan.classList.remove('fan-left', 'fan-right');
    playEffect(handfan, direction === 'left' ? 'fan-left' : 'fan-right');
    bumpStatBar('.heat-bar-fill');
}

// Mauvaise flèche : l'alternance n'est pas respectée
export function missEffect() {
    showFloatingText('✗', handfan, 'miss');
}
