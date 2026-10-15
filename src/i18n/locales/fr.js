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
        copy: {
            title: 'Gratte-papier',
            subtitle: 'Recopiez chaque phrase (accents et ponctuation facultatifs)',
            deadline: 'À rendre avant {time}',
            progress: 'Phrase {current}/{total}',
            placeholder: 'Tapez la phrase ici…',
            open: '📝 Recopie',
            close: 'Fermer',
            timeout: 'Textes non recopiés avant {time}. Le patron a sous-traité votre poste à une classe de maternelle.'
        },
        mood: {
            label: 'Patron',
            sender: '💬 Le patron',
            fired: 'Le patron est à bout. Vous êtes licencié, par message, avec un emoji porte.'
        },
        power: {
            title: '⚡ Coupure de courant',
            open: 'Cliquez pour ouvrir le disjoncteur',
            hint: 'Tapez la combinaison avec les flèches'
        },
        meeting: {
            soon: '📹 Visio à {time}',
            live: '🔴 EN VISIO jusqu\'à {time} : pas d\'éventail !'
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
                },
                coffee: {
                    name: 'Triple expresso',
                    description: 'Votre cœur bat en 7/8 et vos doigts tapent tout seuls. Chaque appui sur Espace rapporte 50 % de travail en plus.'
                },
                mister: {
                    name: 'Brumisateur',
                    description: 'De l\'eau du robinet, vendue au prix de l\'eau minérale. Chaque coup d\'éventail rafraîchit 40 % de plus.'
                },
                chair: {
                    name: 'Chaise ergonomique',
                    description: 'Récupérée dans le bureau du PDG après son 3e remplacement de la semaine. La surchauffe ralentit moins votre travail.'
                },
                headset: {
                    name: 'Casque antibruit',
                    description: 'Vous n\'entendez plus le patron hurler. Les appels urgents manqués coûtent 40 % de travail en moins.'
                },
                mug: {
                    name: 'Mug « Meilleur patron du monde »',
                    description: 'Offert en visio, bien en vue. Le patron commence la journée avec 20 points d\'humeur en plus.'
                },
                background: {
                    name: 'Fond virtuel',
                    description: 'Une photo de vous en train de travailler, prise un jour de pluie. S\'éventer en visio agace beaucoup moins le patron.'
                }
            }
        }
    },

    // Phrases du gratte-papier, tirées au hasard (CopyTask dans src/config/levels.js)
    copyTexts: [
        'Le café de la salle de pause est destiné à ceux ne prenant pas de pause.',
        'Toute réclamation doit être déposée en trois exemplaires puis incinérés.',
        'La climatisation est réservée à la direction hors site.',
        'Les pauses toilettes sont limitées à deux par jour.',
        'Le sourire est obligatoire pendant les heures de bureau.',
        'Les fenêtres restent fermées pour des raisons de sécurité.',
        'La prime de fin d\'année est reportée à l\'année prochaine.',
        'Tout employé qui respire est prié de rester discret.'
    ],

    // Messages du patron (BossMoodConfig dans src/config/levels.js), tirés au hasard.
    // Réponses dans l'ordre : bonne, neutre, mauvaise (affichées mélangées)
    bossMessages: [
        {
            text: 'Vous êtes bien à votre poste ? Votre pastille est orange depuis 4 minutes.',
            answers: ['Toujours, patron ! Je ne cligne même plus des yeux.', 'Oui oui, je suis là.', 'J\'étais aux toilettes.']
        },
        {
            text: 'Petite question : vous seriez dispo ce week-end ? C\'est pour une urgence pas urgente.',
            answers: ['Avec plaisir, le week-end c\'est surfait.', 'Je vais voir ce que je peux faire.', 'Non.']
        },
        {
            text: 'J\'ai eu une idée géniale : et si on supprimait la pause déjeuner pour gagner en agilité ?',
            answers: ['Visionnaire, comme toujours !', 'C\'est une piste.', 'On n\'en a déjà pas.']
        },
        {
            text: 'C\'est le syndic de l\'entreprise, j\'ai piraté le téléphone du patron pour vous recruter',
            answers: ['Jamais, vil mécréant, que la volonté du tout-puissant actionnaire soit faite.', 'C\'est légal ?', 'À bas le capitalisme !']
        },
        {
            text: 'Vous avez vu ma nouvelle photo de profil ? Prise depuis le yacht.',
            answers: ['Magnifique, on dirait un magazine !', 'Sympa.', 'C\'est payé avec nos primes ?']
        },
        {
            text: 'On m\'a dit que vous aviez demandé un ventilateur. C\'est vrai ?',
            answers: ['Jamais ! La chaleur forge le caractère.', 'C\'était une simple question.', 'Oui, et une climatisation aussi.']
        }
    ],

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
        },
        secondday: {
            caller: 'Le patron',
            lines: [
                'Bonjour bonjour ma petite fourmi ouvrière ! Météo France annonce le pic de la canicule pour aujourd\'hui. Excellente nouvelle : la chaleur, ça motive.',
                'Aujourd\'hui, je vous ai invité à deux visios. Caméra allumée, évidemment : je veux voir vos yeux briller de motivation.',
                'Et si je vous vois agiter cet éventail à l\'écran, je vous le fous dans le... (quoi, je ne peux pas dire ça à un employé ? Bon). Évitez l\'éventail, on ne transpire pas devant la direction.',
                'L\'entreprise veut également que vous vous sentiez plus proche de la hiérarchie. Comme si ce n\'était pas déjà le cas. Vous savez que vous êtes mon employé préféré… euh… Paul',
                'Je vous enverrai des messages entre 2 cocktails, alors répondez vite, et bien.',
                'En route mauvaises troupes'
            ]
        },
        thirdday: {
            caller: 'Le patron',
            lines: [
                'Mauvaise nouvelle ma petite abeille bucheuse : avec la canicule, tout le pays a allumé sa clim. Le réseau électrique ne tient plus.',
                'Chez moi, aucun souci, j\'ai un groupe électrogène pour la piscine et un autre pour le mini bar. Chez vous, ça risque de couper plusieurs fois dans la journée, on avait un groupe de rechange mais il me sert de repose pied.',
                'Réparez un disjoncteur n\'a rien de compliquer, vous faite BIP BAP BOUP et tada ça marche !',
                'Et pas d\'excuse, une coupure n\'est pas une pause. Pour vous remonter le moral, une bonne nouvelle. Même l\'hopital as du mal avec l\'electricite, avec de la chance le chef du syndic aura un problème de surchauffe.',
                'Un peu de karma dans ce monde, s\'en prendre au pauvre patron que je suis. Il y a quand meme des monstres sans scrupules, votre compassion silencieuse est toujours aussi touchante.',
                'Allez on garde le rythme'
            ]
        },
        // Réservés au jour 5 (final)
        lastday: {
            caller: 'Le patron',
            lines: [
                'Dernier jour de canicule ! Demain, retour au bureau. Enfin, pour vous : moi, je reste au bord de la piscine.',
                'Pour fêter ça, j\'ai tout prévu : le standard, deux visios, quelques messages, et une petite surprise cet après-midi.',
                'Les actionnaires regardent les chiffres de la semaine. Si on finit en beauté, il y aura peut-être une prime. Pour moi.',
                'Allez, un dernier effort !'
            ]
        },
        memo: {
            caller: 'Le patron',
            lines: [
                'La surprise ! Le gratte-papier est toujours en soins intensifs, et la direction a pondu de nouvelles notes de service.',
                'Recopiez-les avant 17h. Je sais que vous avez déjà beaucoup à faire, mais je crois en vous. Enfin, je crois en votre période d\'essai.'
            ]
        }

    }
};
