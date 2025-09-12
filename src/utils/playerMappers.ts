import { Player, PlayerPayload } from "../types";
import { PlayerFormValues } from "../schemas/playerFormSchema";

// 🔹 Convierte un Player del backend en valores iniciales para Formik
export const playerToFormValues = (player: Player): PlayerFormValues => {
    return {
        id: player.id,
        name: player.name,
        images: player.images || [], // puede venir de Cloudinary
        number: player.number,
        year: player.year,
        age: player.age,
        country: player.country,
        height: player.height,
        position: player.position,
        description: player.description,
        active: player.active,
        stats: {
            id: player.stats?.id,
            goals: player.stats?.goals || 0,
            assists: player.stats?.assists || 0,
            matchesPlayed: player.stats?.matchesPlayed || 0,
            yellow_cards: player.stats?.yellow_cards || 0,
            red_cards: player.stats?.red_cards || 0,
            player_id: player.id,
        },
        socialMedia: player.socialMedia?.map(s => ({
            id: s.id,
            typeOfSocialMedia: s.typeOfSocialMedia,
            url: s.url,
        })) || [],
    };
};

// 🔹 Convierte valores del formulario en un payload para el backend
export const formValuesToFormData = (values: PlayerFormValues): PlayerPayload => {
    return {
        id: values.id!,
        name: values.name,
        images: values.images?.filter((img): img is File => img instanceof File),
        number: values.number,
        year: values.year,
        age: values.age,
        country: values.country,
        height: values.height,
        position: values.position,
        description: values.description,
        stats: {
            id: values.stats.id ?? 0,
            goals: values.stats.goals,
            assists: values.stats.assists,
            matchesPlayed: values.stats.matchesPlayed,
            yellow_cards: values.stats.yellow_cards,
            red_cards: values.stats.red_cards,
            player_id: values.stats.player_id ?? 0,
        },
        active: values.active ?? true,
        socialMedia: values.socialMedia || [],
    };
};
