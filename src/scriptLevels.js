// Définition des niveaux
// Pour ajouter un niveau : copier un bloc et modifier ses valeurs.
// bubbles: null désactive les bulles de tâches pour le niveau.
// tutorial: true affiche le tutoriel guidé (une fois par session).
const LEVELS = [
    {
        name: 'Niveau 1',
        description: 'Travaillez et restez au frais jusqu\'à 18h.',
        workDecay: 2,           // Travail perdu à chaque tick
        workPerPress: 1,        // Travail gagné par appui sur Espace
        heatMorning: 1,         // Chaleur gagnée par tick avant 12h
        heatAfternoon: 4,       // Chaleur gagnée par tick après 12h
        fanCooling: 1.5,        // Chaleur retirée par alternance ← →
        overheatThreshold: 70,  // Au-dessus de cette chaleur, le travail rapporte moins
        overheatWorkFactor: 0.5,// Multiplicateur du gain de travail en surchauffe
        tutorial: true,         // Tutoriel guidé avant le début de la journée
        bubbles: null
    },
    {
        name: 'Niveau 2',
        description: 'Des tâches urgentes apparaissent : cliquez-les avant qu\'elles n\'éclatent !',
        workDecay: 2,
        workPerPress: 1,
        heatMorning: 1,
        heatAfternoon: 4,
        fanCooling: 1.5,
        overheatThreshold: 70,
        overheatWorkFactor: 0.5,
        bubbles: {
            maxCount: 2,        // Bulles simultanées maximum
            minDelay: 3000,     // Délai minimum entre deux bulles (ms)
            maxDelay: 7000,     // Délai maximum entre deux bulles (ms)
            lifetime: 5,        // Secondes avant éclatement
            penalty: 15,        // Travail perdu quand une bulle éclate
            reward: 5           // Travail gagné quand on clique une bulle
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
