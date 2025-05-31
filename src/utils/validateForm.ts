import { Player } from '../types';

export const validateForm = (formData: Player): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!formData.name || formData.name.length < 3) {
        errors.name = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!formData.description || formData.description.length < 3) {
        errors.description = 'La descripción debe tener al menos 3 caracteres.';
    }

    if (formData.number && (formData.number < 1 || formData.number > 99)) {
        errors.number = 'El número debe estar entre 1 y 99.';
    }

    if (formData.country && formData.country.length < 3) {
        errors.country = 'El país debe tener al menos 3 caracteres.';
    }

    if (formData.age && (formData.age < 1 || formData.age > 99)) {
        errors.age = 'La edad debe estar entre 1 y 99.';
    }

    if (formData.year && (new Date().getFullYear() - formData.year < 1 || new Date().getFullYear() - formData.year > 99)) {
        errors.year = 'El año de nacimiento no es válido.';
    }

    if (formData.height && (formData.height < 1 || formData.height > 3)) {
        errors.height = 'La altura debe estar entre 1 y 3 metros.';
    }

    if (!formData.position) {
        errors.position = 'Debe elegir una posición.';
    }

    if (formData.stats) {
        if (formData.stats.goals < 0) {
            errors.goals = 'El número de goles no puede ser negativo.';
        }
        if (formData.stats.assists < 0) {
            errors.assists = 'El número de asistencias no puede ser negativo.';
        }
        if (formData.stats.matches < 0) {
            errors.matches = 'El número de partidos no puede ser negativo.';
        }
        if (formData.stats.yellowCards < 0) {
            errors.yellowCards = 'El número de tarjetas amarillas no puede ser negativo.';
        }
        if (formData.stats.redCards < 0) {
            errors.redCards = 'El número de tarjetas rojas no puede ser negativo.';
        }
    }

    if (formData.socialMedia) {
        formData.socialMedia.forEach((social, index) => {
            if (!social.url || social.url.length < 3) {
                errors[`socialMedia_${index}`] = 'La URL debe tener al menos 3 caracteres.';
            }
        });
    }

    return errors;
};