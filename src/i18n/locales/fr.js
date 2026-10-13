// Textes en français (langue de référence : toute clé doit exister ici)
export default {
    ui: {
        dialogue: {
            next: 'Cliquez pour continuer ▸',
            hangUp: 'Cliquez pour raccrocher ▸',
            skip: 'Passer l\'appel'
        },
        form: {
            title: 'Fiche du nouvel employé',
            subtitle: 'Service des ressources humaines — à remplir obligatoirement',
            deadline: 'À rendre avant {time}',
            open: '📋 Fiche RH',
            close: 'Fermer',
            name: 'Nom',
            sex: 'Sexe',
            male: 'Homme',
            female: 'Femme',
            other: 'Autre',
            age: 'Âge',
            ratings: 'Notez de 1 à 5',
            love: 'Amour pour l\'entreprise',
            suicide: 'Envie de suicide',
            toilets: 'Risque de boucher les toilettes au travail',
            submit: 'Signer',
            timeout: 'Fiche RH non rendue avant {time}. Les RH vous ont raccompagné vers la sortie.'
        },
        levelSelect: {
            title: 'Code secret',
            subtitle: 'Choisissez votre niveau',
            back: 'Retour'
        },
        shop: {
            title: 'Boutique',
            money: 'Votre argent : {money} €',
            buy: 'Acheter — {price} €',
            owned: 'Acheté ✓',
            continue: 'Niveau suivant',
            items: {
                fan: {
                    name: 'Ventilateur',
                    description: 'Grâce au génie humain, vos petits bras seront moins fatigués à la fin de la journée. La chaleur monte 25 % moins vite.'
                },
                ai: {
                    name: 'Abonnement IA',
                    description: 'Ne vous inquiétez pas des terminaux qu\'elle ouvre, ça a sûrement une utilité. Le travail baisse 30 % moins vite.'
                },
                plant: {
                    name: 'Plante verte',
                    description: 'Toujours plus utile que vous. Le seuil de surchauffe augmente de 10 points.'
                },
                voicemail: {
                    name: 'Messagerie vocale',
                    description: 'Grâce à l\'extrait de votre dernier concert sous la douche, les appels urgents patientent sur répondeur : 3 secondes de plus pour décrocher.'
                }
            }
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
        },
        firstday: {
            caller: 'Le patron',
            lines: [
                'HEY HEY HEY notre étoile montante. Alors pas trop fatigué après votre première journée ?',
                'Bien sûr que non, votre seule tâche de la journée était d\'écrire votre nom (et vous avez réussi à faire une faute !)',
                'Quoi qu\'il en soit, on s\'est rendu compte après une centaine d\'appels manqués et 2 messageries pleines que votre collègue qui s\'est pris pour un pigeon s\'occupait du standard téléphonique',
                'Vraiment, il aurait pu nous le dire. Bon il est intubé, mais au moins l\'écrire ! Ah, je vous jure, plus personne n\'a de conscience professionnelle de nos jours',
                'J\'entends dans votre silence que vous êtes ému. Puisque vous me paraissez fort sympathique et que vous êtes en période d\'essai, c\'est vous qui avez la chance de reprendre son travail.',
                'Tout ce que vous avez à faire, c\'est de répondre au téléphone.',
                'Votre famille compte sur vous !'
            ]
        },
        lunch: {
            caller: 'Le patron',
            lines: [
                'Allô ? Je vous dérange pendant votre pause déjeuner ? Ah non, c\'est vrai, vous n\'en avez pas.',
                'Vous n\'allez pas le croire mais un membre du syndic est venu se plaindre pour son pauvre chef bien aimé.',
                'J\'ai cru qu\'il parlait de moi, qui sacrifie et vous offre tant. Vous avez même une corbeille de fruits tous les mois dans la salle commune. Si ça c\'est pas de l\'avantage !',
                'Mais non, il parlait du bricognole en soin intensif. J\'adore faire plaisir, alors je l\'ai envoyé le rejoindre en express.',
                'Et maintenant comme vous vous tourniez les pouces jusque là, c\'est vous qui allez reprendre ses tâches',
                'C\'est un gratte papier, il ne fait que réécrire du texte, rien de sorcier. Même un enfant pourrait le faire. Je le sais, c\'était sous-traité avant qu\'ils ne veuillent plus être payés en billes.',
                'Mais vous, faites du bon travail et vous aurez 10% de gratitude supplémentaire !',
                'Au charbon !'
            ]
        }

    }
};
