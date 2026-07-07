let lastArrowKey = null;  // Tracker la dernière flèche pressée
let gameEventsInitialized = false;

function togglePause() {
    if (!gameStarted || gameOver) return;

    gamePaused = !gamePaused;
    const pauseMenu = document.getElementById('pauseMenu');

    if (gamePaused) {
        pauseMenu.classList.remove('hidden');
    } else {
        pauseMenu.classList.add('hidden');
    }
}

function resumeGame() {
    if (gamePaused) {
        togglePause();
    }
}

function updateModeIndicator() {
    const indicator = document.getElementById('workModeIndicator');
    
    if (currentMode === 'idle') {
        indicator.innerHTML = `MODE REPOS<div id="alternateIndicator"></div>`;
        indicator.classList.add('active');
        indicator.setAttribute('data-mode', currentMode);
        document.getElementById('alternateIndicator').classList.remove('active');
    } else {
        indicator.innerHTML = `MODE ${currentMode.toUpperCase()}<div id="alternateIndicator"></div>`;
        indicator.classList.add('active');
        indicator.setAttribute('data-mode', currentMode);
        const alternateIndicator = document.getElementById('alternateIndicator');

        if (currentMode === 'cool') {
            alternateIndicator.classList.add('active');
            alternateIndicator.textContent = 'Alterne ← →';
        } else {
            alternateIndicator.classList.remove('active');
        }
    }
}

function updateAlternateIndicator(direction) {
    const indicator = document.getElementById('alternateIndicator');
    if (direction === 'left') {
        indicator.textContent = 'Prochain: →';
        indicator.classList.remove('right');
        indicator.classList.add('left');
    } else {
        indicator.textContent = 'Prochain: ←';
        indicator.classList.remove('left');
        indicator.classList.add('right');
    }
}

function initializeGameEvents() {
    if (gameEventsInitialized) return;
    gameEventsInitialized = true;

    const bureau = document.querySelector('.bureau');
    const joueur = document.querySelector('.joueur');
    const handfan = document.querySelector('.handfan');
    const pauseMenu = document.getElementById('pauseMenu');
    const alternateIndicator = document.getElementById('alternateIndicator');

    if (pauseMenu) {
        pauseMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

    // Zones cliquables avec leurs modes
    bureau.addEventListener('click', function() {
        currentMode = 'work';
        updateModeIndicator();
    });

    joueur.addEventListener('click', function() {
        currentMode = 'work';
        updateModeIndicator();
    });

    handfan.addEventListener('click', function() {
        currentMode = 'cool';
        lastArrowKey = null;  // Réinitialiser l'alternance
        updateModeIndicator();
    });

    // Quitter le mode en cliquant sur le background
    document.querySelector('.background').addEventListener('click', function(e) {
        if (!e.target.closest('.bureau') && !e.target.closest('.joueur') && !e.target.closest('.handfan') ) {
            currentMode = 'idle';
            updateModeIndicator();
        }
    });

    // Contrôle clavier
    document.addEventListener('keydown', function(e) { 
        if (!gameStarted || gameOver) return;

        if (e.code === 'Escape') {
            e.preventDefault();
            togglePause();
            return;
        }

        if (gamePaused) return;
        e.preventDefault();

        if (currentMode === 'work') {
            if(e.code === 'Space'){
                workLevel = Math.min(100, workLevel + 1);
            }
        }

        else if (currentMode === 'rest') {
            //heatLevel = Math.max(0, heatLevel - 5);
        }
        else if (currentMode === 'cool') {

            const isLeft = e.code === 'ArrowLeft';
            const isRight = e.code === 'ArrowRight';

            const cooling_effect_fan = 1;

            if (isLeft || isRight) {

                // Vérifier l'alternance
                if (lastArrowKey === null || (isLeft && lastArrowKey === 'right') || 
                        (isRight && lastArrowKey === 'left')) {
                    // Premier appui, on accepte n'importe quelle flèche
                    lastArrowKey = isLeft ? 'left' : 'right';
                    heatLevel = Math.max(0, heatLevel - cooling_effect_fan);
                    updateAlternateIndicator(lastArrowKey);
                } 

            }
            
        }

        updateBars();
    });
}