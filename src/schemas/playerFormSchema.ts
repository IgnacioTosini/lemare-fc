import * as Yup from 'yup';
import { SocialMediaType } from '../types/socialMedia';
import { Position } from '../types/positions';
import { PlayerImage, Player } from '../types';

// Tipo para los valores del formulario
export type PlayerFormValues = {
    id?: number;
    name: string;
    images?: (PlayerImage | File)[];
    number: number;
    year: number;
    age: number;
    country: string;
    height: number;
    position: Position;
    description: string;
    active?: boolean;
    stats: {
        id?: number;
        goals: number;
        assists: number;
        matchesPlayed: number;
        yellow_cards: number;
        red_cards: number;
        player_id?: number;
    };
    socialMedia?: {
        id?: number;
        typeOfSocialMedia: SocialMediaType;
        url: string;
    }[];
};

// Función auxiliar para crear el schema con validaciones dinámicas
export const createPlayerFormSchema = (players: Player[], currentPlayerId?: number) => {
    return Yup.object().shape({
        id: Yup.number().optional(),
        name: Yup.string()
            .min(3, 'El nombre debe tener al menos 3 caracteres')
            .required('El nombre es requerido')
            .test('unique-name', 'El nombre del jugador ya existe', function (value) {
                if (!value) return true;

                const normalizedValue = value.trim().toLowerCase().replace(/\s+/g, ' ');

                const existingPlayer = players.find(player => {
                    const normalizedPlayerName = player.name.trim().toLowerCase().replace(/\s+/g, ' ');
                    return normalizedPlayerName === normalizedValue && player.id !== currentPlayerId;
                });
                return !existingPlayer;
            }),
        nickName: Yup.string().optional(),
        number: Yup.number()
            .integer('El número debe ser un entero')
            .min(1, 'El número debe ser mayor a 0')
            .max(99, 'El número debe ser menor a 100')
            .required('El número es requerido')
            .test('unique-number', 'El número del jugador ya existe', function (value) {
                if (!value) return true;
                const existingPlayer = players.find(player =>
                    player.number === value &&
                    player.id !== currentPlayerId
                );
                return !existingPlayer;
            }),
        position: Yup.mixed<Position>()
            .oneOf(Object.values(Position), 'Debe seleccionar una posición válida')
            .required('La posición es requerida'),
        age: Yup.number()
            .integer('La edad debe ser un entero')
            .min(16, 'La edad mínima es 16 años')
            .max(45, 'La edad máxima es 45 años')
            .required('La edad es requerida'),
        year: Yup.number()
            .integer('El año debe ser un entero')
            .min(1970, 'El año mínimo es 1970')
            .max(new Date().getFullYear() - 16, `El año máximo es ${new Date().getFullYear() - 16}`)
            .required('El año de nacimiento es requerido'),
        country: Yup.string()
            .min(2, 'El país debe tener al menos 2 caracteres')
            .required('El país es requerido'),
        height: Yup.number()
            .min(1.0, 'La altura mínima es 1.0m')
            .max(2.5, 'La altura máxima es 2.5m')
            .required('La altura es requerida'),
        description: Yup.string().optional(),

        // Stats
        stats: Yup.object().shape({
            goals: Yup.number().integer().min(0).required(),
            assists: Yup.number().integer().min(0).required(),
            matchesPlayed: Yup.number().integer().min(0).required(),
            yellow_cards: Yup.number().integer().min(0).required(),
            red_cards: Yup.number().integer().min(0).required(),
            player_id: Yup.number().optional(),
        }),

        // Imágenes múltiples
        images: Yup.array()
            .of(
                Yup.mixed<PlayerImage | File>().test(
                    'image-format',
                    'La imagen debe ser un archivo válido o un objeto Cloudinary',
                    function (value) {
                        if (!value) return true; // permite vacío
                        if (value instanceof File) return value.type.startsWith('image/');
                        if (isPlayerImage(value)) return true;
                        return false;
                    }
                )
            )
            .optional(),

        // Redes sociales
        socialMedia: Yup.array()
            .of(
                Yup.object().shape({
                    id: Yup.number().optional(),
                    typeOfSocialMedia: Yup.mixed<SocialMediaType>()
                        .oneOf(Object.values(SocialMediaType))
                        .required(),
                    url: Yup.string().url().required(),
                    playerId: Yup.number().optional()
                })
            )
            .optional()
    });
};

export function isPlayerImage(value: unknown): value is PlayerImage {
    return (
        typeof value === 'object' &&
        value !== null &&
        'url' in value &&
        'publicId' in value &&
        typeof (value as Pick<PlayerImage, 'url'>).url === 'string' &&
        typeof (value as Pick<PlayerImage, 'publicId'>).publicId === 'string'
    );
}