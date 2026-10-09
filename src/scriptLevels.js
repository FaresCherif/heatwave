// Définition des niveaux
// Pour ajouter un niveau : copier un bloc et modifier ses valeurs.
// bubbles: null désactive les bulles de tâches pour le niveau.
const LEVELS = [
    {
        name: 'Niveau 1',
        description: 'Travaillez et restez au frais jusqu\'à 18h.',
        workDecay: 5,           // Travail perdu à chaque tick
        heatMorning: 2,         // Chaleur gagnée par tick avant 12h
        heatAfternoon: 8,       // Chaleur gagnée par tick après 12h
        bubbles: null
    },
    {
        name: 'Niveau 2',
        description: 'Des tâches urgentes apparaissent : cliquez-les avant qu\'elles n\'éclatent !',
        workDecay: 5,
        heatMorning: 2,
        heatAfternoon: 8,
        bubbles: {
            maxCount: 2,        // Bulles simultanées maximum
            minDelay: 3000,     // Délai minimum entre deux bulles (ms)
            maxDelay: 7000,     // Délai maximum entre deux bulles (ms)
            lifetime: 5,        // Secondes avant éclatement
            penalty: 50         // Travail perdu quand une bulle éclate
        }
    }
];

let currentLevelIndex = 0;

function getCurrentLevel() {
    return LEVELS[currentLevelIndex];
}

function isLastLevel() {
    return currentLevelIndex >= LEVELS.length - 1;
}
