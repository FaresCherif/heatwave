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
- [index.html](index.html) : structure de la page et menus.
- [src/scriptGame.js](src/scriptGame.js) : logique principale du jeu.
- [src/scriptInteraction.js](src/scriptInteraction.js) : interactions avec les éléments du jeu.
- [src/scriptMenu.js](src/scriptMenu.js) : menus et états du jeu.
- [src/scriptClock.js](src/scriptClock.js) : horloge / temps.
- [src/scrpitBar.js](src/scrpitBar.js) : barres d'état.
- [src/scriptTutorial.js](src/scriptTutorial.js) : tutoriel guidé du niveau 1 (étapes dans `TUTORIAL_STEPS`).
- [src/styles](src/styles) : feuilles de style du jeu.

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
- Ouvrir le jeu dans le navigateur avec [index.html](index.html).
- Vérifier les erreurs JavaScript dans la console du navigateur.
- Tester rapidement les changements en rechargeant la page.

## Déploiement itch.io
- Automatique : chaque push sur `main` déclenche [.github/workflows/itch.yml](.github/workflows/itch.yml) (secret `BUTLER_API_KEY`, variables `ITCH_USER` et `ITCH_GAME` à définir sur GitHub).
