/**
 * Détection d'une suite de touches (codes secrets). Sans DOM : testable.
 */

// Code secret du menu de démarrage : ↑ ↑ ↓ ↓ ← → ← → Entrée
export const LEVEL_SELECT_CODE = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'Enter'
];

/**
 * Renvoie une fonction à appeler à chaque touche : elle répond true
 * quand les dernières touches reçues forment la suite attendue.
 * Comparer les dernières touches (plutôt qu'avancer pas à pas) tolère
 * les faux départs, ex : ↑ ↑ ↑ ↓ ↓…
 * @param {string[]} sequence
 * @returns {(key: string) => boolean}
 */
export function createSequenceDetector(sequence) {
    const recent = [];
    return key => {
        recent.push(key);
        if (recent.length > sequence.length) recent.shift();

        const matched = recent.length === sequence.length && recent.every((k, i) => k === sequence[i]);
        // Repartir de zéro : le code doit être retapé en entier
        if (matched) recent.length = 0;
        return matched;
    };
}
