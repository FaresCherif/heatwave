# AGENT

Ce dossier contient un petit jeu web en JavaScript, HTML et CSS. Le projet est une expérience de bureau interactive où le joueur doit gérer la température et la productivité.

## Contexte du projet
- Point d'entrée principal : [index.html](index.html)
- Logique du jeu : [src](src)
- Styles : [src/styles](src/styles)
- Images : [src/images](src/images)

## Objectif pour une IA
Lorsque tu modifies ce projet, tu dois préserver le gameplay, la cohérence visuelle et la simplicité du code.

## Règles de travail
- Conserver la structure existante du projet et éviter les restructurations inutiles.
- Ne pas casser le fonctionnement du jeu : démarrage, pause, reprise, game over et interactions.
- Préférer des changements petits, lisibles et localisés.
- Vérifier que les fichiers HTML, CSS et JavaScript restent cohérents entre eux.
- Si tu ajoutes une fonctionnalité, garder le style du jeu déjà présent.

## Fichiers importants à connaître
La structure complète est décrite dans [README.md](README.md).
- [index.html](index.html) : structure de la page, HUD et écrans.
- [src/main.js](src/main.js) : point d'entrée (modules ES).
- [src/config/levels.js](src/config/levels.js) : paramètres des niveaux.
- [src/core/rules.js](src/core/rules.js) : règles du jeu en fonctions pures, sans DOM. Toute nouvelle règle de calcul va ici, avec son test dans [tests/rules.test.js](tests/rules.test.js).
- [src/core/state.js](src/core/state.js) : état unique de la partie (`state.phase` : menu, tutorial, playing, ended).
- [src/core/game.js](src/core/game.js) : boucle de jeu, début et fin de journée, pause.
- [src/core/events.js](src/core/events.js) : bus d'événements (`mode-changed`, `action`, `stats-changed`).
- [src/systems](src/systems) : appels de l'histoire, tutoriel, appels urgents, salaire.
- [src/i18n](src/i18n) : traductions. Les dialogues de l'histoire sont dans `locales/<langue>.js` ; le français est la référence et toute nouvelle clé doit être ajoutée dans chaque langue (vérifié par [tests/i18n.test.js](tests/i18n.test.js)).
- [src/ui](src/ui) : seuls modules qui modifient l'affichage.
- [src/styles](src/styles) : une feuille de style par zone (scène, HUD, écrans, effets, tutoriel).

## Comportements à préserver
- Le jeu doit pouvoir démarrer depuis le menu.
- La pause doit permettre de reprendre ou de redémarrer.
- Le game over doit afficher un écran adapté.
- Les barres de travail et de chaleur doivent continuer à évoluer logiquement.

## Conseils de développement
- Teste les changements dans le navigateur après modification.
- Vérifie la console JavaScript pour d’éventuelles erreurs.
- Évite d’introduire des dépendances externes si le projet est simple.
- Si tu corriges un bug, explique la cause et la solution de manière claire.

## Commandes utiles
- `npm start` : sert le jeu en local (les modules ES ne fonctionnent pas en ouvrant index.html directement).
- `npm test` : tests unitaires des règles (node:test, aucune dépendance).
- Vérifier les erreurs JavaScript dans la console du navigateur.

## Déploiement itch.io
- Automatique : chaque push sur `main` déclenche [.github/workflows/itch.yml](.github/workflows/itch.yml) après les tests (secret `BUTLER_API_KEY`, variables `ITCH_USER` et `ITCH_GAME` à définir sur GitHub).
