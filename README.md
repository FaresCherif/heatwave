# 🌡️ Heatwave

Petit jeu web de gestion en temps réel : survivez à une journée de bureau pendant la canicule en jonglant entre **productivité** et **coups de chaud**.

**[▶ Jouer sur itch.io](https://farescherif.itch.io/heatwave)**

![Capture du jeu](docs/screenshot.png)

## Le jeu

Chaque niveau est une journée de travail. Deux jauges évoluent en permanence :

- 💼 **Travail** : baisse toute seule. À 0, vous êtes renvoyé. Sous 50 %, votre salaire du jour diminue.
- 🌡️ **Chaleur** : monte toute la journée, encore plus vite l'après-midi. Au-delà du seuil, c'est la surchauffe et le travail rapporte moitié moins. À 100 %, c'est perdu.

Tenez jusqu'à 18h pour toucher votre salaire. Au niveau 2, des appels urgents apparaissent : répondez avant qu'ils n'éclatent.

### Commandes

| Action | Commande |
| --- | --- |
| Passer en mode travail | Clic sur le personnage, le bureau ou l'ordinateur |
| Travailler | `Espace` |
| Passer en mode ventilation | Clic sur l'éventail |
| Se ventiler | Alterner `←` et `→` |
| Répondre à un appel | Clic sur le téléphone |
| Pause | `Échap` |

Le premier niveau commence par un tutoriel interactif.

## Points techniques

- **JavaScript vanilla, modules ES, aucune dépendance** : pas de framework ni de bundler, le navigateur charge directement les sources.
- **Règles du jeu isolées et testées** : toute la logique (chaleur, surchauffe, alternance des flèches, salaire, fin de partie) est faite de fonctions pures dans [`src/core/rules.js`](src/core/rules.js), sans accès au DOM ni à l'état global. Elles sont couvertes par des tests unitaires avec le test runner natif de Node (`node:test`).
- **État centralisé** : un seul objet [`state`](src/core/state.js) avec une phase explicite (`menu` → `tutorial` → `playing` → `ended`) et un indicateur de pause indépendant.
- **Découplage par événements** : un [bus d'événements](src/core/events.js) minimal permet au tutoriel de réagir aux actions du joueur sans que le code des contrôles le connaisse.
- **Niveaux pilotés par la configuration** : durée de la journée, vitesses, seuils et salaire sont réglés dans [`src/config/levels.js`](src/config/levels.js) (documenté en JSDoc).
- **CI/CD** : à chaque push sur `main`, GitHub Actions lance les tests, puis publie le jeu sur itch.io avec [butler](https://itch.io/docs/butler/).
- **Rendu** : scène en 16:9 qui couvre tout l'écran, sprites en pixel art, animations et retours visuels en CSS.

## Structure

```
index.html              Structure de la page : HUD, scène, écrans
src/
├── main.js             Point d'entrée : branche les boutons et les contrôles
├── input.js            Clavier et clics sur la scène
├── config/
│   └── levels.js       Paramètres de chaque niveau
├── core/
│   ├── state.js        État de la partie
│   ├── rules.js        Règles du jeu (fonctions pures, testées)
│   ├── game.js         Boucle de jeu, début et fin de journée, pause
│   └── events.js       Bus d'événements
├── systems/
│   ├── tutorial.js     Tutoriel guidé
│   ├── bubbles.js      Appels urgents
│   └── money.js        Salaire
├── ui/
│   ├── hud.js          Horloge, jauges, salaire, mode actif
│   ├── screens.js      Menus et écrans de fin
│   └── effects.js      Animations et textes flottants
├── styles/             Feuilles de style par zone de l'interface
└── images/             Sprites
tests/
└── rules.test.js       Tests unitaires des règles
```

## Lancer le projet

Les modules ES doivent être servis en HTTP : ouvrir `index.html` directement ne fonctionne pas.

```bash
npm start   # serveur local sur http://localhost:3000
npm test    # tests unitaires (Node 20+)
```

L'extension **Live Server** de VS Code fonctionne aussi.

## Ajouter un niveau

Copier un bloc dans [`src/config/levels.js`](src/config/levels.js) et ajuster ses valeurs. Mettre `bubbles: null` pour désactiver les appels urgents.
