# CLAUDE.md

Heatwave : jeu web de gestion en temps réel (JavaScript vanilla, modules ES, aucune dépendance, aucun bundler). Le code, les commentaires et la documentation sont en français : garder cette langue.

Les règles de travail et de game design du projet sont dans AGENT.md, à respecter :

@AGENT.md

## Commandes

- `npm start` : sert le jeu sur http://localhost:3000 (ouvrir `index.html` directement ne marche pas, à cause des modules ES).
- `npm test` : tous les tests (`node --test`, Node 20+, la CI utilise Node 22).
- Un seul fichier : `node --test tests/rules.test.js`. Un seul test : `node --test --test-name-pattern="altern" tests/rules.test.js`.
- Pas de linter ni d'étape de build. Le déploiement copie simplement `index.html` et `src/` (voir [.github/workflows/itch.yml](.github/workflows/itch.yml)).

## Architecture

**Ce qui est testable et ce qui ne l'est pas.** Seuls `src/core/` (sauf `game.js`), `src/config/` et `src/i18n/` se chargent sous Node. Les modules de `src/systems/` et `src/ui/` lisent le DOM (`document.getElementById`) dès leur import : on ne peut pas les importer dans un test. Toute logique à tester va donc dans une fonction pure de `src/core/` (`rules.js`, `upgrades.js`, `employee.js`, `sequence.js`) et c'est le système qui l'appelle.

**Boucle de jeu** ([src/core/game.js](src/core/game.js)). Un `setInterval` d'une seconde = un tick = 5 minutes de jeu (`MINUTES_PER_TICK` dans `rules.js`). `tick()` dans l'ordre : baisse du travail et hausse de la chaleur, game over, salaire, avance de l'heure, échéances (fiche RH, recopie), fin de journée, puis `updateMeetings / updateOutages / updateBossMood`, puis l'appel prévu à cette heure. Rien ne s'écoule si `isTimeRunning()` est faux (phase différente de `playing`, ou pause).

**Cycle de vie des systèmes.** Chaque système de `src/systems/` expose `start…()`, `stop…()` et souvent `update…()` (appelé à chaque tick). Ajouter un système, c'est le brancher à trois endroits de `game.js` : `restartLevel()` (remise à zéro et démarrage), `endDay()` (arrêt) et `tick()` (mise à jour). Un système sans configuration dans le niveau ne doit rien faire (`if (!getLevel().xxx) return`).

**Niveau effectif.** Toujours lire les paramètres avec `getLevel()` ([src/core/state.js](src/core/state.js)), jamais `LEVELS[i]` directement : `getLevel()` renvoie une copie du niveau avec les effets des objets achetés (`applyUpgrades`). Une fonctionnalité de niveau est une clé optionnelle de `levels.js` (`bubbles`, `bossMood`, `meetings`, `outages`, `employeeForm`…), documentée dans le JSDoc `Level` en tête du fichier. Cette clé sert aussi de valeur à `requires` dans `shop.js`.

**Étapes asynchrones.** Dialogues, tutoriel et boutique renvoient une promesse résolue quand le joueur a fini. Pendant ce temps la phase passe à `dialogue` ou `tutorial`, ce qui fige le temps. Comme le joueur peut relancer le niveau en cours d'étape, `game.js` compare `currentDayId` après chaque `await` pour ignorer la suite d'un lancement périmé. Garder cette vérification dans toute nouvelle séquence asynchrone.

**Communication.** Les systèmes appellent directement `ui/` pour l'affichage. Pour réagir aux actions du joueur sans dépendre de [src/input.js](src/input.js), on passe par le bus [src/core/events.js](src/core/events.js) (`mode-changed`, `action`, `stats-changed`). Un système qui modifie `state.work`, `state.heat` ou `state.bossMood` en dehors de l'horloge doit émettre `stats-changed` : c'est ce qui déclenche le rendu des jauges et la vérification du game over.

**Textes.** `t('clé', { param })` et `getDialogue(nom)` ([src/i18n/index.js](src/i18n/index.js)). Dans le HTML, les textes passent par l'attribut `data-i18n` et les `alt` des images par `data-i18n-alt`. `main.js` traduit toute la page au chargement, et un écran construit dynamiquement appelle `applyTranslations(element)`. Toute clé ajoutée à `fr.js` doit aussi aller dans `en.js` (sinon `tests/i18n.test.js` échoue), et c'est valable aussi pour les noms d'objets de la boutique (`shop.items.<id>.name/description`).

## Ajouter une fonctionnalité de niveau (checklist)

1. Clé et JSDoc dans [src/config/levels.js](src/config/levels.js), activée à partir d'un niveau précis.
2. Règles de calcul en fonctions pures dans `src/core/rules.js`, avec leurs tests.
3. Système dans `src/systems/`, branché dans `restartLevel` / `endDay` / `tick`.
4. Éléments dans [index.html](index.html), styles dans une feuille de `src/styles/` (liée depuis `index.html`).
5. Textes dans `fr.js` **et** `en.js`.
6. Objets de boutique qui l'améliorent : `requires: '<clé>'` (voir les règles de game design dans AGENT.md).
7. Mettre à jour README.md (section du jeu et structure) et AGENT.md si les fichiers importants changent.

## Pièges connus

- Les boutons perdent le focus après un clic (`bindButton` dans [src/main.js](src/main.js), `blur()` dans la boutique) : sinon `Espace`, la touche de travail, les réactiverait. À reproduire sur tout nouveau bouton.
- Aucun texte affiché ne doit être écrit en dur, ni dans le JS ni dans `index.html` (seule exception : le nom « HEATWAVE »). Un niveau n'a pas de nom dans `levels.js`, seulement un `id` : son nom et sa description se trouvent dans `levels.<id>` de chaque langue (`getLevelName` / `getLevelDescription`). Les règles pures renvoient une clé, pas un texte (ex : `getGameOverReason` → `'heat'`, traduit par `game.js`).
- Les heures décimales (`10.5` = 10h30) sont acceptées dans `bossMood.messageHours` et `outages.hours`. Les `calls` se déclenchent seulement à l'heure pile.
- Les objets d'histoire (`effects: []`, `days`) sont filtrés par numéro de jour : `isUnlocked` reçoit les niveaux joués, et la boutique qui suit le jour N a `playedLevels.length === N`.
