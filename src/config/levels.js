/**
 * Définition des niveaux.
 * Pour ajouter un niveau : copier un bloc et modifier ses valeurs.
 *
 * @typedef {Object} BubbleConfig
 * @property {number} maxCount  Bulles simultanées maximum
 * @property {number} minDelay  Délai minimum entre deux bulles (ms)
 * @property {number} maxDelay  Délai maximum entre deux bulles (ms)
 * @property {number} lifetime  Secondes avant éclatement
 * @property {number} penalty   Travail perdu quand une bulle éclate
 * @property {number} reward    Travail gagné quand on clique une bulle
 *
 * @typedef {Object} CopyTask
 * @property {number} count         Phrases à recopier
 * @property {number} deadlineHour  Heure limite, sinon game over
 * @property {number} reward        Travail gagné par phrase recopiée
 *
 * @typedef {Object} ScheduledCall
 * @property {number} hour          Heure de l'appel
 * @property {string} dialogue      Nom du dialogue (src/i18n/locales)
 * @property {CopyTask} [copyTask]  Textes à recopier, donnés à la fin de l'appel
 *
 * @typedef {Object} Level
 * @property {string} name
 * @property {string} description
 * @property {number} startHour           Heure de début de journée
 * @property {number} endHour             Heure de fin : niveau réussi
 * @property {number} workDecay           Travail perdu à chaque tick
 * @property {number} workPerPress        Travail gagné par appui sur Espace
 * @property {number} heatMorning         Chaleur gagnée par tick avant 12h
 * @property {number} heatAfternoon       Chaleur gagnée par tick après 12h
 * @property {number} fanCooling          Chaleur retirée par alternance ← →
 * @property {number} overheatThreshold   Au-dessus de cette chaleur, le travail rapporte moins
 * @property {number} overheatWorkFactor  Multiplicateur du gain de travail en surchauffe
 * @property {number} dailyPay            Salaire maximum de la journée (€)
 * @property {number} lowWorkThreshold    Sous ce niveau de travail, le salaire diminue
 * @property {string} [intro]            Appel joué avant la journée : nom d'un dialogue (src/i18n/locales)
 * @property {ScheduledCall[]} [calls]    Appels joués pendant la journée
 * @property {{deadlineHour: number}} [employeeForm]  Fiche du nouvel employé à signer pendant la journée avant deadlineHour, sinon game over
 * @property {boolean} [tutorial]         Tutoriel guidé avant la journée
 * @property {BubbleConfig|null} bubbles  null désactive les appels urgents
 */

/** @type {Level[]} */
export const LEVELS = [
    {
        name: 'Niveau 1',
        description: 'Travaillez et restez au frais jusqu\'à 18h.',
        startHour: 13,
        endHour: 18,
        workDecay: 2,
        workPerPress: 1,
        heatMorning: 1,
        heatAfternoon: 4,
        fanCooling: 1.5,
        overheatThreshold: 70,
        overheatWorkFactor: 0.5,
        dailyPay: 100,
        lowWorkThreshold: 50,
        intro: 'welcome',
        employeeForm: { deadlineHour: 16 },
        tutorial: true,
        bubbles: null
    },
    {
        name: 'Niveau 2',
        description: 'Des tâches urgentes apparaissent : cliquez-les avant qu\'elles n\'éclatent !',
        intro: 'firstday',
        calls: [{ hour: 11, dialogue: 'lunch', copyTask: { count: 2, deadlineHour: 18, reward: 50 } }],
        startHour: 8,
        endHour: 18,
        workDecay: 2,
        workPerPress: 1,
        heatMorning: 1,
        heatAfternoon: 4,
        fanCooling: 1.5,
        overheatThreshold: 70,
        overheatWorkFactor: 0.5,
        dailyPay: 100,
        lowWorkThreshold: 50,
        bubbles: {
            maxCount: 2,
            minDelay: 3000,
            maxDelay: 7000,
            lifetime: 5,
            penalty: 15,
            reward: 5
        }
    }
];
