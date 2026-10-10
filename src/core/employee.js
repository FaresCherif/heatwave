/**
 * Fiche du nouvel employé : conversion des réponses du formulaire (fonction pure, testée).
 *
 * @typedef {Object} Employee
 * @property {string} name
 * @property {'male'|'female'|'other'} sex
 * @property {number} age
 * @property {number} love     Amour pour l'entreprise, de 1 à 5
 * @property {number} suicide  Envie de suicide, de 1 à 5
 * @property {number} toilets  Risque de boucher les toilettes, de 1 à 5
 */

export const RATING_FIELDS = ['love', 'suicide', 'toilets'];
export const SEXES = ['male', 'female', 'other'];

/**
 * @param {Record<string, string>} data  Valeurs brutes du formulaire
 * @returns {Employee|null} null si une réponse manque ou est invalide
 */
export function parseEmployee(data) {
    const name = (data.name || '').trim();
    const age = Number(data.age);
    const ratings = Object.fromEntries(RATING_FIELDS.map(field => [field, Number(data[field])]));

    const valid = name !== ''
        && SEXES.includes(data.sex)
        && Number.isInteger(age) && age >= 16 && age <= 99
        && Object.values(ratings).every(value => Number.isInteger(value) && value >= 1 && value <= 5);

    return valid ? { name, sex: data.sex, age, ...ratings } : null;
}
