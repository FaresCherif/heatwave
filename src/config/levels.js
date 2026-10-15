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
 * @typedef {Object} BossMoodConfig
 * @property {number} start            Humeur en début de journée (0 à 100 ; à 0, licenciement)
 * @property {number[]} messageHours   Heures des messages du patron (décimales : 10.5 = 10h30)
 * @property {number} replyMinutes     Minutes de jeu pour répondre à un message
 * @property {number[]} answerMood     Humeur gagnée par réponse : [bonne, neutre, mauvaise]
 * @property {number} missPenalty      Humeur perdue pour un message sans réponse
 *
 * @typedef {Object} MeetingConfig
 * @property {{hour: number, duration: number}[]} slots  Visios : heure de début et durée en minutes
 * @property {number} warningMinutes   Annonce de la visio, en minutes avant son début
 * @property {number} moodPenalty      Humeur perdue par coup d'éventail pendant la visio
 *
 * @typedef {Object} OutageConfig
 * @property {number[]} hours       Heures des coupures de courant (décimales : 10.5 = 10h30)
 * @property {number} codeLength    Flèches à taper au disjoncteur pour relancer le courant
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
 * @property {BossMoodConfig} [bossMood]  Humeur du patron et ses messages
 * @property {MeetingConfig} [meetings]   Visios : s'éventer à l'écran agace le patron (bossMood requis)
 * @property {OutageConfig} [outages]     Coupures de courant : plus de travail à l'ordinateur jusqu'à la relance
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
    },
    {
        name: 'Niveau 3',
        description: 'Pic de la canicule : gardez le patron de bonne humeur et ne vous éventez pas en visio !',
        intro: 'secondday',
        startHour: 8,
        endHour: 18,
        workDecay: 2,
        workPerPress: 1,
        heatMorning: 1.5,
        heatAfternoon: 5,
        fanCooling: 1.5,
        overheatThreshold: 70,
        overheatWorkFactor: 0.5,
        dailyPay: 120,
        lowWorkThreshold: 50,
        bubbles: {
            maxCount: 2,
            minDelay: 3000,
            maxDelay: 7000,
            lifetime: 5,
            penalty: 15,
            reward: 5
        },
        bossMood: {
            start: 60,
            messageHours: [9, 10.5, 12.5, 14, 16.5],
            replyMinutes: 45,
            answerMood: [15, 0, -15],
            missPenalty: 20
        },
        meetings: {
            slots: [{ hour: 11, duration: 60 }, { hour: 15, duration: 45 }],
            warningMinutes: 15,
            moodPenalty: 3
        }
    },
    {
        name: 'Niveau 4',
        description: 'Avant dernier jour de la canicule.',
        intro: 'thirdday',
        startHour: 8,
        endHour: 18,
        workDecay: 2,
        workPerPress: 1,
        heatMorning: 1.5,
        heatAfternoon: 5,
        fanCooling: 1.5,
        overheatThreshold: 70,
        overheatWorkFactor: 0.5,
        dailyPay: 150,
        lowWorkThreshold: 50,
        bubbles: {
            maxCount: 2,
            minDelay: 3000,
            maxDelay: 7000,
            lifetime: 5,
            penalty: 15,
            reward: 5
        },
        bossMood: {
            start: 60,
            messageHours: [9, 11.5, 12.5, 14.5, 16.5],
            replyMinutes: 45,
            answerMood: [15, 0, -15],
            missPenalty: 20
        },
        outages: {
            hours: [10, 13, 15.5],
            codeLength: 5
        }
    }
];
