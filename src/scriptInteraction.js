let lastArrowKey = null;  // Tracker la dernière flèche pressée
let gameEventsInitialized = false;
let activeBubbles = [];
let bubbleSpawnIntervalId = null;
let bubbleCountdownIntervalId = null;

function scheduleNextBubble() {
    if (bubbleSpawnIntervalId !== null) {
        clearTimeout(bubbleSpawnIntervalId);
    }

    // Nouveau délai aléatoire à chaque tentative
    const delay = 3000 + Math.random() * 4000;
    bubbleSpawnIntervalId = setTimeout(spawnBubble, delay);
}

function spawnBubble() {
    const background = document.querySelector('.background');
    if (!gameStarted || gameOver || gamePaused || !background || activeBubbles.length >= 2) {
        scheduleNextBubble();
        return;
    }

    const bubble = document.createElement('button');
    bubble.type = 'button';
    bubble.className = 'task-bubble';
    bubble.innerHTML = '<span class="bubble-check">✓</span><span class="bubble-timer">5s</span>';

    const left = 15 + Math.random() * 70;
    const top = 15 + Math.random() * 70;
    bubble.style.left = `${left}%`;
    bubble.style.top = `${top}%`;

    bubble.addEventListener('click', function(e) {
        e.stopPropagation();
        removeBubble(bubble);
    });

    background.appendChild(bubble);
    activeBubbles.push({ element: bubble, timeLeft: 5 });
    scheduleNextBubble();
}

function updateBubbleDisplay(bubble, timeLeft) {
    const timer = bubble.querySelector('.bubble-timer');
    if (timer) {
        timer.textContent = `${timeLeft}s`;
    }
}

function removeBubble(bubbleElement) {
    if (!bubbleElement) return;

    activeBubbles = activeBubbles.filter(item => item.element !== bubbleElement);
    if (bubbleElement.parentNode) {
        bubbleElement.parentNode.removeChild(bubbleElement);
    }
}

function burstBubble(bubbleElement) {
    if (!bubbleElement) return;

    bubbleElement.classList.add('burst');
    bubbleElement.innerHTML = '<span>💥</span>';

    workLevel = Math.max(0, workLevel - 50);
    updateBars();

    setTimeout(function() {
        removeBubble(bubbleElement);
    }, 180);

    checkGameOver();
}

function updateBubbles() {
    if (!gameStarted || gameOver || gamePaused) return;

    activeBubbles = activeBubbles.filter(item => {
        item.timeLeft -= 1;
        updateBubbleDisplay(item.element, item.timeLeft);

        if (item.timeLeft <= 0) {
            burstBubble(item.element);
            return false;
        }

        return true;
    });
}

function startBubbleSystem() {
    stopBubbleSystem();

    scheduleNextBubble();
    bubbleCountdownIntervalId = setInterval(updateBubbles, 1000);
}

function stopBubbleSystem() {
    if (bubbleSpawnIntervalId !== null) {
        clearTimeout(bubbleSpawnIntervalId);
        bubbleSpawnIntervalId = null;
    }

    if (bubbleCountdownIntervalId !== null) {
        clearInterval(bubbleCountdownIntervalId);
        bubbleCountdownIntervalId = null;
    }

    activeBubbles.forEach(item => {
        if (item.element.parentNode) {
            item.element.parentNode.removeChild(item.element);
        }
    });
    activeBubbles = [];
}

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

        // Bloquer uniquement les touches du jeu (garder F5, F12, Ctrl+R...)
        if (e.code === 'Space' || e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
            e.preventDefault();
        }

        if (currentMode === 'work') {
            // Ignorer la répétition automatique quand la touche est maintenue
            if(e.code === 'Space' && !e.repeat){
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