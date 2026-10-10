// Textes en français (langue de référence : toute clé doit exister ici)
export default {
    ui: {
        dialogue: {
            next: 'Cliquez pour continuer ▸',
            hangUp: 'Cliquez pour raccrocher ▸',
            skip: 'Passer l\'appel'
        }
    },

    // Appels de l'histoire, joués avant un niveau avec `intro: '<nom>'`
    dialogues: {
        welcome: {
            caller: 'Le patron',
            lines: [
                'Allô ? Ah, c\'est vous le nouveau m... membre de notre belle et grande famille !',
                'Avec la canicule, nos très chers et estimés membres du syndic ont remonté que les températures dans les bureaux étaient soi-disant "contraires au respect humain"',
                'Pendant que la canicule passe (et que le chef du syndic se remet de cette mystérieuse chute par la fenêtre), l\'entreprise vous offre généreusement une semaine de travail en distanciel',
                'Quelle chance vous avez vraiment ! Et ça ne s\'arrête pas là, le département marketing offre même un éventail à l\'employé le plus pauvre : VOUS. Quelle chance vraiment, on vous chouchoute',
                'Allez, au travail ! Et n\'oubliez pas : pas de rendement, pas de salaire.'
            ]
        }
    }
};
