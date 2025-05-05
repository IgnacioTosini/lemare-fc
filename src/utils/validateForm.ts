import { Player } from '../types';

export const validateForm = (formData: Player, player?: Player): boolean => {
    const isCreating = !formData.id; // Si no hay ID, es una creación
    return (
        !!(formData.name.length >= 3 && (!isCreating || formData.name !== player?.name)) &&
        !!((formData.description?.length ?? 0) >= 3) &&
        !!(!formData.number || (formData.number >= 1 && formData.number <= 99)) &&
        !!(!formData.country || formData.country.length >= 3) &&
        !!(!formData.age || (formData.age >= 1 && formData.age <= 99)) &&
        !!(!formData.year || (new Date().getFullYear() - formData.year >= 1 && new Date().getFullYear() - formData.year <= 99)) &&
        !!(!formData.height || (formData.height >= 1 && formData.height <= 3)) &&
        !!formData.position &&
        !!formData.stats &&
        !!(formData.stats.goals >= 0) &&
        !!(formData.stats.assists >= 0) &&
        !!(formData.stats.matches >= 0) &&
        !!(formData.stats.yellowCards >= 0) &&
        !!(formData.stats.redCards >= 0) &&
        !!(formData.socialMedia ?? []).every(social => social.url.length >= 3)
    );
};