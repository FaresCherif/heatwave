// Fiche du nouvel employé : à remplir pendant la journée de travail, avant une heure limite.
// Un bouton ouvre et ferme la fiche tant qu'elle n'est pas signée ; le temps continue de s'écouler.
import { state } from '../core/state.js';
import { parseEmployee, RATING_FIELDS } from '../core/employee.js';
import { formatTime, minutesUntil } from '../core/rules.js';
import { applyTranslations, t } from '../i18n/index.js';

const URGENT_MINUTES = 30;  // Échéance signalée en rouge dans les 30 dernières minutes de jeu
const RATING_ICONS = { love: '❤️', suicide: '💀', toilets: '🚽' };

const els = {
    panel: document.getElementById('employeeForm'),
    form: document.getElementById('employeeFormFields'),
    nameInput: document.getElementById('formName'),
    ratings: document.getElementById('formRatings'),
    deadline: document.getElementById('formDeadline'),
    submit: document.getElementById('formSubmit'),
    close: document.getElementById('formClose'),
    toggle: document.getElementById('formToggle'),
    toggleDeadline: document.getElementById('formToggleDeadline')
};

let deadlineHour = null;  // null : aucune fiche en attente

// Une ligne de 5 icônes cliquables par critère noté
function buildRatings() {
    RATING_FIELDS.forEach(field => {
        const row = document.createElement('fieldset');
        row.className = 'form-rating';

        const legend = document.createElement('legend');
        legend.dataset.i18n = `form.${field}`;
        row.appendChild(legend);

        const icons = document.createElement('div');
        icons.className = 'rating-icons';
        for (let value = 1; value <= 5; value++) {
            const label = document.createElement('label');
            label.title = `${value}/5`;
            label.innerHTML = `<input type="radio" name="${field}" value="${value}"><span>${RATING_ICONS[field]}</span>`;
            icons.appendChild(label);
        }
        row.appendChild(icons);
        els.ratings.appendChild(row);
    });
}

/** Rend la fiche disponible (bouton visible), à signer avant deadlineHour. */
export function startEmployeeForm(hour) {
    deadlineHour = hour;
    els.form.reset();
    applyTranslations(els.panel);
    applyTranslations(els.toggle);

    const deadlineText = t('form.deadline', { time: formatTime(hour) });
    els.deadline.textContent = deadlineText;
    els.toggleDeadline.textContent = deadlineText;

    renderForm();
    updateFormDeadline();
    setOpen(false);
    els.toggle.classList.remove('hidden');
}

/** Retire la fiche et son bouton (fiche signée, ou journée relancée). */
export function stopEmployeeForm() {
    deadlineHour = null;
    setOpen(false);
    els.toggle.classList.add('hidden');
}

export function isFormPending() {
    return deadlineHour !== null;
}

/** Fiche non signée à l'heure limite */
export function isFormOverdue() {
    return isFormPending() && minutesUntil(state.hour, state.minute, deadlineHour) <= 0;
}

// Appelée à chaque tick : l'échéance passe au rouge quand elle approche
export function updateFormDeadline() {
    if (!isFormPending()) return;
    const urgent = minutesUntil(state.hour, state.minute, deadlineHour) <= URGENT_MINUTES;
    els.deadline.classList.toggle('urgent', urgent);
    els.toggle.classList.toggle('urgent', urgent);
}

function setOpen(open) {
    els.panel.classList.toggle('hidden', !open);
    els.toggle.classList.toggle('open', open);
    els.toggle.setAttribute('aria-expanded', String(open));

    if (open) {
        els.nameInput.focus();
    } else if (els.panel.contains(document.activeElement)) {
        // Rendre le clavier au jeu (Espace, flèches)
        document.activeElement.blur();
    }
}

function toggleForm() {
    if (isFormPending()) setOpen(els.panel.classList.contains('hidden'));
}

function readForm() {
    return parseEmployee(Object.fromEntries(new FormData(els.form)));
}

function renderForm() {
    // Remplir les icônes jusqu'à la note choisie
    RATING_FIELDS.forEach(field => {
        const selected = Number(els.form.elements[field].value) || 0;
        els.form.querySelectorAll(`input[name="${field}"]`).forEach(input => {
            input.parentElement.classList.toggle('filled', Number(input.value) <= selected);
        });
    });
    els.submit.disabled = readForm() === null;
}

els.form.addEventListener('input', renderForm);
els.form.addEventListener('change', event => {
    renderForm();
    // Les flèches doivent ventiler, pas changer la note ou le sexe choisis
    if (event.target.type === 'radio') event.target.blur();
});

els.form.addEventListener('submit', event => {
    event.preventDefault();
    const employee = readForm();
    if (!employee || !isFormPending()) return;

    state.employee = employee;
    stopEmployeeForm();
});

els.toggle.addEventListener('click', () => {
    els.toggle.blur();
    toggleForm();
});
els.close.addEventListener('click', () => setOpen(false));

buildRatings();
