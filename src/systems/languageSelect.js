// Choix de la langue sur le menu de démarrage : un bouton par langue de LOCALES.
// Proposé seulement avant la partie : aucun texte dynamique n'est encore affiché,
// il suffit donc de retraduire les textes fixes de la page.
import { LOCALES, getLanguage, setLanguage, applyTranslations } from '../i18n/index.js';

const container = document.getElementById('languageSelect');

// Drapeaux en SVG : les émojis drapeaux ne s'affichent pas sous Windows (seulement « FR », « GB »)
const FLAGS = {
    fr: `<svg viewBox="0 0 3 2" aria-hidden="true">
            <rect width="1" height="2" fill="#002395"/>
            <rect x="1" width="1" height="2" fill="#fff"/>
            <rect x="2" width="1" height="2" fill="#ed2939"/>
        </svg>`,
    en: `<svg viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <clipPath id="flagEnDiagonals"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
            <rect width="60" height="30" fill="#012169"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#flagEnDiagonals)" stroke="#c8102e" stroke-width="4"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" stroke-width="6"/>
        </svg>`
};

function render() {
    document.documentElement.lang = getLanguage();
    // Chaque langue s'affiche sous son propre nom (« English » même en français)
    container.replaceChildren(...Object.entries(LOCALES).map(([code, locale]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.innerHTML = `${FLAGS[code] ?? ''}<span></span>`;
        button.querySelector('span').textContent = locale.ui.language.name;
        button.setAttribute('aria-pressed', String(code === getLanguage()));
        button.addEventListener('click', () => {
            button.blur();  // Sinon Espace (touche de travail) réactiverait le bouton
            setLanguage(code);
            applyTranslations();
            render();
        });
        return button;
    }));
}

export function initLanguageSelect() {
    render();
}
