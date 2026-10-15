/**
 * Traductions : choix de la langue et accès aux textes.
 * Pour ajouter une langue : créer locales/<code>.js sur le modèle de fr.js
 * et l'ajouter à LOCALES. Une clé absente retombe sur le français.
 *
 * Langue choisie, par ordre de priorité :
 * 1. paramètre d'URL ?lang=en (pratique pour tester)
 * 2. dernier choix enregistré dans le navigateur
 * 3. français par défaut
 *
 * @typedef {Object} Dialogue
 * @property {string} caller   Nom affiché de la personne qui appelle
 * @property {string[]} lines  Répliques, affichées une par une
 */
import fr from './locales/fr.js';
import en from './locales/en.js';

export const LOCALES = { fr, en };
export const DEFAULT_LANGUAGE = 'fr';
const STORAGE_KEY = 'heatwave-language';

let language = detectLanguage();

function isSupported(code) {
    return Object.hasOwn(LOCALES, code);
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
    return DEFAULT_LANGUAGE;
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

/** Traduit les éléments HTML marqués data-i18n="clé" */
export function applyTranslations(root = document) {
    root.querySelectorAll('[data-i18n]').forEach(element => {
        element.textContent = t(element.dataset.i18n);
    });
}

/**
 * Dialogue de l'histoire dans la langue active.
 * @returns {Dialogue|undefined}
 */
export function getDialogue(id) {
    return LOCALES[language].dialogues[id] ?? LOCALES[DEFAULT_LANGUAGE].dialogues[id];
}

/**
 * Messages du patron dans la langue active.
 * @returns {{text: string, answers: string[]}[]}  Réponses : bonne, neutre, mauvaise
 */
export function getBossMessages() {
    return LOCALES[language].bossMessages ?? LOCALES[DEFAULT_LANGUAGE].bossMessages;
}

/** Phrases à recopier du gratte-papier, dans la langue active */
export function getCopyTexts() {
    return LOCALES[language].copyTexts ?? LOCALES[DEFAULT_LANGUAGE].copyTexts;
}
