document.addEventListener('DOMContentLoaded', function() {
    const bureau = document.querySelector('.bureau');
    const joueur = document.querySelector('.joueur');

    const workModeIndicator = document.createElement('div');
    workModeIndicator.id = 'workModeIndicator';
    document.querySelector('.room').appendChild(workModeIndicator);

    // Zones cliquables avec leurs modes
    bureau.addEventListener('click', function() {
        currentMode = 'work';
        updateModeIndicator();
    });

    joueur.addEventListener('click', function() {
        currentMode = 'work';
        updateModeIndicator();
    });


    // Quitter le mode en cliquant sur le background
    document.querySelector('.background').addEventListener('click', function(e) {
        if (!e.target.closest('.bureau') && !e.target.closest('.joueur') ) {
            currentMode = 'idle';
            updateModeIndicator();
        }
    });

    function updateModeIndicator() {
        const indicator = document.getElementById('workModeIndicator');
        
        if (currentMode === 'idle') {
            indicator.classList.remove('active');
        } else {
            indicator.textContent = `MODE ${currentMode.toUpperCase()}`;
            indicator.classList.add('active');
            indicator.setAttribute('data-mode', currentMode);
        }
    }

    // Contrôle clavier
    document.addEventListener('keydown', function(e) { 
        if (e.code === 'Space' && !gameOver) {
            e.preventDefault();

            if (currentMode === 'work') {
                workLevel = Math.min(100, workLevel + 1);
            } else if (currentMode === 'rest') {
                //heatLevel = Math.max(0, heatLevel - 5);
            }

            updateBars();
        }
    });
});