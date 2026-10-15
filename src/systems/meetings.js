// Visios : annoncées quelques minutes avant, caméra allumée pendant leur durée.
// S'éventer à l'écran agace le patron : chaque coup d'éventail lui coûte de l'humeur.
import { state, getLevel } from '../core/state.js';
import { getMeetingStatus, formatMinutes } from '../core/rules.js';
import { on } from '../core/events.js';
import { changeMood } from './bossMood.js';
import { t } from '../i18n/index.js';

const badge = document.getElementById('meetingBadge');
const handfan = document.querySelector('.handfan');

let live = false;

function getConfig() {
    return getLevel().meetings;
}

// Appelée à chaque tick et en début de journée : annonce, puis caméra allumée
export function updateMeetings() {
    const config = getConfig();
    const meeting = config ? getMeetingStatus(state.hour, state.minute, config.slots, config.warningMinutes) : null;
    live = meeting?.status === 'live';

    badge.classList.toggle('hidden', !meeting);
    badge.classList.toggle('live', live);
    document.body.classList.toggle('meeting-live', live);
    if (!meeting) return;

    badge.textContent = live
        ? t('meeting.live', { time: formatMinutes(meeting.end) })
        : t('meeting.soon', { time: formatMinutes(meeting.start) });
}

/** Coupe la caméra (journée terminée ou relancée) */
export function stopMeetings() {
    live = false;
    badge.classList.add('hidden');
    document.body.classList.remove('meeting-live');
}

on('action', type => {
    if (live && type === 'cool') changeMood(-getConfig().moodPenalty, handfan);
});
