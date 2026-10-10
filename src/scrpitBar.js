function updateBars() {
    const workBar = document.querySelector('.work-bar-fill');
    const heatBar = document.querySelector('.heat-bar-fill');

    workBar.style.width = workLevel + '%';
    workBar.style.backgroundColor = getBarColor(workLevel, 'work');

    heatBar.style.width = heatLevel + '%';
    heatBar.style.backgroundColor = getBarColor(heatLevel, 'heat');

    // Placer les traits des seuils : salaire réduit et surchauffe
    document.querySelector('.work-threshold').style.left = getCurrentLevel().lowWorkThreshold + '%';
    document.querySelector('.heat-threshold').style.left = getCurrentLevel().overheatThreshold + '%';

    // Signaler la surchauffe sur la colonne Chaleur
    heatBar.closest('.stat-bar').classList.toggle('overheat', isOverheated());
}

function isOverheated() {
    return heatLevel >= getCurrentLevel().overheatThreshold;
}


function getBarColor(level, type) {
    if (type === 'work') {
        // Vert, orange sous le seuil de salaire, puis rouge quand le travail devient critique
        if (level <= 25) return 'hsl(0, 85%, 50%)';
        if (level < getCurrentLevel().lowWorkThreshold) return 'hsl(30, 95%, 50%)';
        return 'hsl(130, 70%, 45%)';
    } else if (type === 'heat') {
        // 0% = jaune, 100% = rouge (jamais vert : pas de confusion avec le travail)
        const hue = 50 - (level * 0.5);
        return `hsl(${hue}, 100%, 50%)`;
    }
}
