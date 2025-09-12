import { Player } from '../types';
import { toast } from 'react-toastify';

export const isNumberDuplicate = (number: number | undefined, players: Player[]): boolean => {
    if (!number) return false;
    return players.some(player => player.number === number);
};

export const generateErrorMessages = (formData: Player): boolean => {
    const errorMessages = [];

    if (formData.name.length < 3) errorMessages.push('El nombre debe tener al menos 3 caracteres.');
    if ((formData.description?.length ?? 0) < 3) errorMessages.push('La descripción debe tener al menos 3 caracteres.');
    if (formData.number && (formData.number < 1 || formData.number > 99)) errorMessages.push('El número debe estar entre 1 y 99.');
    if (formData.country && formData.country.length < 3) errorMessages.push('El país debe tener al menos 3 caracteres.');
    if (formData.age && (formData.age < 1 || formData.age > 99)) errorMessages.push('La edad debe estar entre 1 y 99.');
    if (formData.year && (new Date().getFullYear() - formData.year < 1 || new Date().getFullYear() - formData.year > 99)) errorMessages.push('El año de nacimiento no es válido.');
    if (formData.height && (formData.height < 1 || formData.height > 3)) errorMessages.push('La altura debe estar entre 1 y 3 metros.');
    if (!formData.position) errorMessages.push('Debe elegir una posición.');
    if ((formData.stats?.goals ?? 0) < 0 || (formData.stats?.assists ?? 0) < 0 || (formData.stats?.matchesPlayed ?? 0) < 0 || (formData.stats?.yellow_cards ?? 0) < 0 || (formData.stats?.red_cards ?? 0) < 0) {
        errorMessages.push('Las estadísticas no pueden ser negativas.');
    }
    if ((formData.socialMedia ?? []).some(social => social.url.length < 3)) errorMessages.push('Todas las URLs de redes sociales deben tener al menos 3 caracteres.');

    errorMessages.forEach(message => toast.error(message));

    return errorMessages.length === 0; // Retorna true si no hay errores
};