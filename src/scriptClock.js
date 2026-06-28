let currentHour = 8;
let currentMinute = 0;

function updateClock() {
    const clock = document.querySelector('.clock');
    const time = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`;
    clock.textContent = time;

    // Avance de 5 minutes
    currentMinute += 5;
    if (currentMinute >= 60) {
        currentMinute = 0;
        currentHour += 1;
    }

    // Boucle à 08:00 quand on atteint 18:00
    if (currentHour >= 18) {
        currentHour = 8;
        currentMinute = 0;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Met à jour toutes les 2 secondes (adapter la durée selon vos besoins)
    setInterval(updateClock, 2000);
    updateClock(); // Affiche l'heure initiale
});