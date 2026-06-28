function updateBars() {
    const workBar = document.querySelector('.work-bar-fill');
    const heatBar = document.querySelector('.heat-bar-fill');

    workBar.style.height = workLevel + '%';
    workBar.style.backgroundColor = getBarColor(workLevel, 'work');

    heatBar.style.height = heatLevel + '%';
    heatBar.style.backgroundColor = getBarColor(heatLevel, 'heat');
}


function getBarColor(level, type) {
    if (type === 'work') {
        // 100% = vert, 0% = rouge
        const hue = level * 1.2; // 120 = vert, 0 = rouge
        return `hsl(${hue}, 100%, 50%)`;
    } else if (type === 'heat') {
        // 0% = bleu, 100% = rouge
        // Bleu = 240°, Rouge = 0°
        const hue = 240 - (level * 2.4);
        return `hsl(${hue}, 100%, 50%)`;
    }
}