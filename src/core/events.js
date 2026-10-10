/**
 * Bus d'événements minimal : les systèmes réagissent aux actions du joueur
 * sans dépendre directement du code qui les déclenche.
 *
 * Événements utilisés :
 * - 'mode-changed'  : le joueur a changé de mode (travail, ventilation, repos)
 * - 'action'        : action réussie, avec 'work' ou 'cool' en paramètre
 * - 'stats-changed' : travail ou chaleur modifiés hors horloge
 */
const listeners = new Map();

export function on(name, callback) {
    if (!listeners.has(name)) listeners.set(name, []);
    listeners.get(name).push(callback);
}

export function emit(name, payload) {
    (listeners.get(name) || []).forEach(callback => callback(payload));
}
