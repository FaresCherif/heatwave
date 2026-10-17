// Choix de la langue sur le menu de démarrage : un bouton par langue de LOCALES.
// Proposé seulement avant la partie : aucun texte dynamique n'est encore affiché,
// il suffit donc de retraduire les textes fixes de la page.
import { LOCALES, getLanguage, setLanguage, applyTranslations } from '../i18n/index.js';

const container = document.getElementById('languageSelect');

function render() {
    document.documentElement.lang = getLanguage();
    // Chaque langue s'affiche sous son propre nom (« English » même en français)
    container.replaceChildren(...Object.entries(LOCALES).map(([code, locale]) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = locale.ui.language.name;
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
