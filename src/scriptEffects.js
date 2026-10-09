// Effets visuels : zones interactives et retours d'action

// Texte flottant ("+1", "-1.5°"...) qui monte et disparaît au-dessus d'un élément
function showFloatingText(text, anchorElement, type) {
    const background = document.querySelector('.background');
    if (!background || !anchorElement) return;

    const bgRect = background.getBoundingClientRect();
    const rect = anchorElement.getBoundingClientRect();

    // Petit décalage aléatoire pour que les textes ne se superposent pas
    const offsetX = (Math.random() - 0.5) * rect.width * 0.3;

    const floating = document.createElement('div');
    floating.className = `floating-text ${type}`;
    floating.textContent = text;
    floating.style.left = `${rect.left - bgRect.left + rect.width / 2 + offsetX}px`;
    floating.style.top = `${rect.top - bgRect.top + rect.height * 0.2}px`;

    floating.addEventListener('animationend', function() {
        floating.remove();
    });

    background.appendChild(floating);
}

// Rejoue une animation CSS même si elle est déjà en cours
function playEffect(element, className) {
    if (!element) return;

    element.classList.remove(className);
    void element.offsetWidth;  // Force le navigateur à relancer l'animation
    element.classList.add(className);

    // Retirer la classe à la fin, sinon elle remplace le halo des zones
    element.addEventListener('animationend', function() {
        element.classList.remove(className);
    }, { once: true });
}

// Met en avant les zones du mode actif
function updateZoneHighlight() {
    document.querySelectorAll('.bureau, .joueur').forEach(function(zone) {
        zone.classList.toggle('selected', currentMode === 'work');
    });

    const handfan = document.querySelector('.handfan');
    if (handfan) handfan.classList.toggle('selected', currentMode === 'cool');
}

function workEffect(amount) {
    showFloatingText(`+${amount}`, document.querySelector('.joueur'), 'gain');
    playEffect(document.querySelector('.joueur'), 'typing');
    playEffect(document.querySelector('.work-bar-fill').closest('.stat-bar-vertical'), 'bump');
}

function coolEffect(amount, direction) {
    const handfan = document.querySelector('.handfan');

    showFloatingText(`-${amount}°`, handfan, 'cool');
    handfan.classList.remove('fan-left', 'fan-right');
    playEffect(handfan, direction === 'left' ? 'fan-left' : 'fan-right');
    playEffect(document.querySelector('.heat-bar-fill').closest('.stat-bar-vertical'), 'bump');
}

// Mauvaise flèche : l'alternance n'est pas respectée
function missEffect() {
    showFloatingText('✗', document.querySelector('.handfan'), 'miss');
}
