/**
 * Traductions : choix de la langue et accès aux textes.
 * Pour ajouter une langue : créer locales/<code>.js sur le modèle de fr.js
 * et l'ajouter à LOCALES. Une clé absente retombe sur le français.
 *
 * Langue choisie, par ordre de priorité :
 * 1. paramètre d'URL ?lang=en (pratique pour tester)
 * 2. dernier choix enregistré dans le navigateur (boutons du menu de démarrage)
 * 3. langue du navigateur, si le jeu la connaît
 * 4. anglais sinon (public international d'itch.io)
 * Le français reste la langue de référence : c'est lui qui complète une clé absente.
 *
 * @typedef {Object} Dialogue
 * @property {string} caller   Nom affiché de la personne qui appelle
 * @property {string[]} lines  Répliques, affichées une par une
 */
import fr from './locales/fr.js';
import en from './locales/en.js';

export const LOCALES = { fr, en };
export const DEFAULT_LANGUAGE = 'fr';
export const BROWSER_FALLBACK_LANGUAGE = 'en';
const STORAGE_KEY = 'heatwave-language';

let language = detectLanguage();

function isSupported(code) {
    return Object.hasOwn(LOCALES, code);
}

/**
 * Première langue du navigateur connue du jeu, sinon l'anglais.
 * Les variantes régionales comptent pour leur langue : 'en-US' → 'en', 'fr-CA' → 'fr'.
 * @param {readonly string[]} preferred  Langues du navigateur par préférence (navigator.languages)
 * @returns {string}
 */
export function pickBrowserLanguage(preferred) {
    const match = preferred
        .map(code => code.toLowerCase().split('-')[0])
        .find(isSupported);
    return match ?? BROWSER_FALLBACK_LANGUAGE;
}

function detectLanguage() {
    // Hors navigateur (tests Node) : langue par défaut
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE;

    const fromUrl = new URLSearchParams(window.location.search).get('lang');
    if (isSupported(fromUrl)) return fromUrl;

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (isSupported(stored)) return stored;
    } catch {
        // Stockage indisponible (navigation privée...) : on ignore
    }
    // Certains navigateurs ne renseignent que navigator.language
    return pickBrowserLanguage(navigator.languages ?? [navigator.language ?? '']);
}

export function getLanguage() {
    return language;
}

export function setLanguage(code) {
    if (!isSupported(code)) return;
    language = code;
    try {
        localStorage.setItem(STORAGE_KEY, code);
    } catch {
        // Le choix ne sera simplement pas mémorisé
    }
}

// Cherche une clé pointée ('dialogue.skip') dans un objet de textes
function lookup(root, key) {
    return key.split('.').reduce((node, part) => node?.[part], root);
}

/**
 * Texte de l'interface, ex : t('dialogue.skip').
 * Les variables {nom} sont remplacées : t('form.deadline', { time: '16:00' })
 */
export function t(key, params = {}) {
    const text = lookup(LOCALES[language].ui, key) ?? lookup(LOCALES[DEFAULT_LANGUAGE].ui, key) ?? key;
    return text.replace(/\{(\w+)\}/g, (match, name) => params[name] ?? match);
}

/** Valeur brute de l'interface (ex : liste de paragraphes), avec repli sur le français */
export function getLocaleValue(key) {
    return lookup(LOCALES[language].ui, key) ?? lookup(LOCALES[DEFAULT_LANGUAGE].ui, key);
}

/**
 * Nombre affiché : au plus une décimale, séparateur de la langue (2,1 en français).
 * Les objets de la boutique multiplient les paramètres : sans arrondi, 1.5 × 1.4 s'afficherait 2.0999999999999996.
 */
export function formatNumber(value) {
    return new Intl.NumberFormat(language, { maximumFractionDigits: 1 }).format(value);
}

/**
 * Traduit les éléments HTML marqués data-i18n="clé" (texte), data-i18n-alt="clé" (images)
 * data-i18n-hint="clé" (bulle au survol, affichée en CSS par attr(data-hint))
 * et data-i18n-aria="clé" (nom accessible d'un bouton sans texte, ex : ❚❚)
 */
export function applyTranslations(root = document) {
    root.querySelectorAll('[data-i18n]').forEach(element => {
        element.textContent = t(element.dataset.i18n);
    });
    root.querySelectorAll('[data-i18n-alt]').forEach(element => {
        element.alt = t(element.dataset.i18nAlt);
    });
    root.querySelectorAll('[data-i18n-hint]').forEach(element => {
        element.dataset.hint = t(element.dataset.i18nHint);
    });
    root.querySelectorAll('[data-i18n-aria]').forEach(element => {
        element.setAttribute('aria-label', t(element.dataset.i18nAria));
    });
}

/** Nom affiché d'un niveau (src/config/levels.js), ex : « Niveau 1 » */
export function getLevelName(/** @type {{id: string}} */ level) {
    return t(`levels.${level.id}.name`);
}

/** Description d'un niveau, affichée avant de le jouer */
export function getLevelDescription(/** @type {{id: string}} */ level) {
    return t(`levels.${level.id}.description`);
}

/**
 * Dialogue de l'histoire dans la langue active.
 * Une réplique peut dépendre d'un objet acheté en boutique :
 * { ifOwned: '<id>', lines: [...], otherwise: [...] } est remplacé par les répliques qui conviennent.
 * @param {string} id
 * @param {string[]} [ownedItems]  Objets possédés (state.ownedItems)
 * @returns {Dialogue|undefined}
 */
export function getDialogue(id, ownedItems = []) {
    const dialogue = LOCALES[language].dialogues[id] ?? LOCALES[DEFAULT_LANGUAGE].dialogues[id];
    if (!dialogue) return undefined;

    const lines = dialogue.lines.flatMap(line => {
        if (typeof line === 'string') return [line];
        return ownedItems.includes(line.ifOwned) ? line.lines : line.otherwise ?? [];
    });
    return { ...dialogue, lines };
}

/**
 * Messages du patron dans la langue active.
 * @returns {{text: string, answers: string[]}[]}  Réponses : bonne, neutre, mauvaise
 */
export function getBossMessages() {
    return LOCALES[language].bossMessages ?? LOCALES[DEFAULT_LANGUAGE].bossMessages;
}

/**
 * Phrases à recopier du gratte-papier, dans la langue active
 * @param {string} [pool]  Liste de phrases dans src/i18n/locales (CopyTask.pool)
 */
export function getCopyTexts(pool = 'copyTexts') {
    return LOCALES[language][pool] ?? LOCALES[DEFAULT_LANGUAGE][pool];
}
