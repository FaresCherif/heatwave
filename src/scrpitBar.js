function updateBars() {
    const workBar = document.querySelector('.work-bar-fill');
    const heatBar = document.querySelector('.heat-bar-fill');

    workBar.style.width = workLevel + '%';
    workBar.style.backgroundColor = getBarColor(workLevel, 'work');

    heatBar.style.width = heatLevel + '%';
    heatBar.style.backgroundColor = getBarColor(heatLevel, 'heat');

    // Placer le trait du seuil de surchauffe
    document.querySelector('.heat-threshold').style.left = getCurrentLevel().overheatThreshold + '%';

    // Signaler la surchauffe sur la colonne Chaleur
    heatBar.closest('.stat-bar').classList.toggle('overheat', isOverheated());
}

function isOverheated() {
    return heatLevel >= getCurrentLevel().overheatThreshold;
}


function getBarColor(level, type) {
    if (type === 'work') {
        // Vert, puis rouge quand le travail devient critique
        return level <= 25 ? 'hsl(0, 85%, 50%)' : 'hsl(130, 70%, 45%)';
    } else if (type === 'heat') {
        // 0% = jaune, 100% = rouge (jamais vert : pas de confusion avec le travail)
        const hue = 50 - (level * 0.5);
        return `hsl(${hue}, 100%, 50%)`;
    }
}
