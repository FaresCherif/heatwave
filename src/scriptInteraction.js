document.addEventListener('DOMContentLoaded', function() {
    const bureau = document.querySelector('.bureau');
    const joueur = document.querySelector('.joueur');
    const handfan = document.querySelector('.handfan');

    let lastArrowKey = null;  // Tracker la dernière flèche pressée

    const alternateIndicator = document.getElementById('alternateIndicator');

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

    function updateModeIndicator() {
        const indicator = document.getElementById('workModeIndicator');
        
        if (currentMode === 'idle') {
            indicator.innerHTML = `MODE REPOS`;
            indicator.classList.add('active');
            indicator.setAttribute('data-mode', currentMode);
            alternateIndicator.classList.remove('active');
        } else {
            indicator.innerHTML = `MODE ${currentMode.toUpperCase()}`;
            indicator.classList.add('active');
            indicator.setAttribute('data-mode', currentMode);
            workModeIndicator.appendChild(alternateIndicator);

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



    // Contrôle clavier
    document.addEventListener('keydown', function(e) { 
        if(gameOver) return;
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
});