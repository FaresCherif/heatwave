// Tutoriel guidé du niveau 1 : l'horloge reste figée tant qu'il est affiché.
// Chaque étape attend une action du joueur avant de passer à la suivante.
// - done : condition vérifiée à chaque changement de mode
// - action + count : nombre d'actions ('work' ou 'cool') à réaliser
// - button : étape validée par un bouton
const TUTORIAL_STEPS = [
    {
        text: 'Cliquez sur le personnage ou l\'ordinateur pour passer en <b>mode travail</b>.',
        target: '.joueur',
        done: () => currentMode === 'work'
    },
    {
        text: 'Appuyez sur <b>Espace</b> pour remplir la barre 💼 Travail. Elle baisse en continu : à 0, vous êtes renvoyé !',
        target: '.work-bar-fill',
        action: 'work',
        count: 5
    },
    {
        text: 'La 🌡️ Chaleur monte toute la journée, encore plus vite après 12h. Cliquez sur l\'<b>éventail</b>.',
        target: '.handfan',
        done: () => currentMode === 'cool',
        onStart: () => { heatLevel = 40; }  // Pour voir la chaleur baisser à l'étape suivante
    },
    {
        text: 'Alternez <b>←</b> et <b>→</b> pour vous rafraîchir. Appuyer deux fois sur la même flèche ne sert à rien !',
        target: '.heat-bar-fill',
        action: 'cool',
        count: 6
    },
    {
        text: () => `Au-delà du trait blanc, c'est la <b>surchauffe</b> : le travail rapporte moitié moins. À 100 %, c'est fini.<br>Tenez jusqu'à <b>${getCurrentLevel().endHour}h</b> ! (Échap = pause)`,
        target: '.heat-threshold',
        button: 'C\'EST PARTI'
    }
];

let tutorialActive = false;
let tutorialDone = false;  // Le tutoriel ne s'affiche qu'une fois par session
let tutorialStepIndex = 0;
let tutorialCount = 0;

function shouldShowTutorial() {
    return getCurrentLevel().tutorial && !tutorialDone;
}

function startTutorial() {
    tutorialActive = true;
    // Barre de travail entamée pour voir l'effet de la touche Espace
    workLevel = 60;
    updateBars();
    document.getElementById('tutorial').classList.remove('hidden');
    showTutorialStep(0);
}

function showTutorialStep(index) {
    clearTutorialTarget();
    tutorialStepIndex = index;
    tutorialCount = 0;

    const step = TUTORIAL_STEPS[index];
    if (step.onStart) {
        step.onStart();
        updateBars();
    }

    document.getElementById('tutorialStep').textContent = `${index + 1}/${TUTORIAL_STEPS.length}`;
    // Le texte peut être une fonction pour dépendre du niveau
    document.getElementById('tutorialText').innerHTML = typeof step.text === 'function' ? step.text() : step.text;

    const button = document.getElementById('tutorialNext');
    button.textContent = step.button || '';
    button.classList.toggle('hidden', !step.button);
    // Dernière étape : « Passer » ferait doublon avec le bouton
    document.querySelector('.tutorial-skip').classList.toggle('hidden', !!step.button);

    renderTutorialProgress();

    // Mettre en avant l'élément concerné (sprite ou ligne de barre)
    const target = document.querySelector(step.target);
    if (target) (target.closest('.stat-bar') || target).classList.add('tuto-target');

    // L'action est peut-être déjà faite (ex : déjà en mode travail)
    updateTutorial();
}

function renderTutorialProgress() {
    const step = TUTORIAL_STEPS[tutorialStepIndex];
    const progress = document.getElementById('tutorialProgress');
    progress.textContent = step.action ? `${tutorialCount} / ${step.count}` : '';
}

// Appelée à chaque changement de mode et après chaque action réussie
function updateTutorial(action) {
    if (!tutorialActive) return;

    const step = TUTORIAL_STEPS[tutorialStepIndex];
    if (step.action) {
        if (action !== step.action) return;
        tutorialCount++;
        renderTutorialProgress();
        if (tutorialCount < step.count) return;
    } else if (!step.done || !step.done()) {
        return;
    }

    nextTutorialStep();
}

function nextTutorialStep() {
    if (tutorialStepIndex + 1 < TUTORIAL_STEPS.length) {
        showTutorialStep(tutorialStepIndex + 1);
    } else {
        endTutorial();
    }
}

// Fin ou abandon : la journée commence avec les valeurs normales
function endTutorial() {
    if (!tutorialActive) return;

    tutorialActive = false;
    tutorialDone = true;
    workLevel = 100;
    heatLevel = 0;
    updateBars();
    hideTutorial();
}

function hideTutorial() {
    clearTutorialTarget();
    const panel = document.getElementById('tutorial');
    if (panel) panel.classList.add('hidden');
}

function clearTutorialTarget() {
    document.querySelectorAll('.tuto-target').forEach(function(element) {
        element.classList.remove('tuto-target');
    });
}
