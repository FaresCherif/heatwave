// Boutique entre deux niveaux : l'argent gagné achète des objets actifs jusqu'à la fin de la partie.
// openShop() renvoie une promesse résolue quand le joueur passe au niveau suivant.
import { state } from '../core/state.js';
import { canBuy, isUnlocked } from '../core/upgrades.js';
import { SHOP_ITEMS } from '../config/shop.js';
import { LEVELS } from '../config/levels.js';
import { applyTranslations, t } from '../i18n/index.js';
import { showScreen, hideScreen } from '../ui/screens.js';
import { renderMoney, renderItems } from '../ui/hud.js';

const els = {
    screen: document.getElementById('shopScreen'),
    money: document.getElementById('shopMoney'),
    items: document.getElementById('shopItems'),
    continue: document.getElementById('shopContinue')
};

let resolveClose = null;

/** @returns {Promise<void>} */
export function openShop() {
    applyTranslations(els.screen);
    render();
    showScreen('shop');
    return new Promise(resolve => { resolveClose = resolve; });
}

function buy(item) {
    if (!canBuy(item, state.totalMoney, state.ownedItems)) return;

    state.totalMoney -= item.price;
    state.ownedItems.push(item.id);
    renderMoney();
    renderItems();
    render();
}

function render() {
    els.money.textContent = t('shop.money', { money: state.totalMoney });
    // La boutique s'ouvre à la fin du niveau en cours : il compte parmi les niveaux joués
    const playedLevels = LEVELS.slice(0, state.levelIndex + 1);
    const items = SHOP_ITEMS.filter(item => isUnlocked(item, playedLevels));
    els.items.replaceChildren(...items.map(renderItem));
}

function renderItem(item) {
    const owned = state.ownedItems.includes(item.id);

    const card = document.createElement('div');
    card.className = 'shop-item';
    card.classList.toggle('owned', owned);
    card.innerHTML = `
        <div class="shop-icon">${item.icon}</div>
        <div class="shop-info">
            <strong></strong>
            <p></p>
        </div>
        <button type="button" class="shop-buy"></button>`;
    card.querySelector('strong').textContent = t(`shop.items.${item.id}.name`);
    card.querySelector('p').textContent = t(`shop.items.${item.id}.description`);

    const button = card.querySelector('.shop-buy');
    button.textContent = owned ? t('shop.owned') : t('shop.buy', { price: item.price });
    button.disabled = !canBuy(item, state.totalMoney, state.ownedItems);
    button.addEventListener('click', () => buy(item));
    return card;
}

els.continue.addEventListener('click', () => {
    els.continue.blur();
    hideScreen('shop');
    resolveClose?.();
    resolveClose = null;
});
