import * as Yup from 'yup';
import { SocialMediaType } from '../types/socialMedia';
import { Position } from '../types/positions';
import { CloudinaryImage, Player } from '../types';

// Tipo para los valores del formulario
export type PlayerFormValues = {
    id?: number;
    name: string;
    image?: CloudinaryImage | File;
    number: number;
    year: number;
    age: number;
    country: string;
    height: number;
    position: Position;
    description: string;
    stats: {
        goals: number;
        assists: number;
        matches: number;
        yellowCards: number;
        redCards: number;
    };
    socialMedia?: {
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

                // Normalizar igual que el backend
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
            goals: Yup.number()
                .integer('Los goles deben ser un entero')
                .min(0, 'Los goles no pueden ser negativos')
                .required('Los goles son requeridos'),
            assists: Yup.number()
                .integer('Las asistencias deben ser un entero')
                .min(0, 'Las asistencias no pueden ser negativas')
                .required('Las asistencias son requeridas'),
            matches: Yup.number()
                .integer('Los partidos deben ser un entero')
                .min(0, 'Los partidos no pueden ser negativos')
                .required('Los partidos son requeridos'),
            yellowCards: Yup.number()
                .integer('Las tarjetas amarillas deben ser un entero')
                .min(0, 'Las tarjetas amarillas no pueden ser negativas')
                .required('Las tarjetas amarillas son requeridas'),
            redCards: Yup.number()
                .integer('Las tarjetas rojas deben ser un entero')
                .min(0, 'Las tarjetas rojas no pueden ser negativas')
                .required('Las tarjetas rojas son requeridas'),
        }),

        // Imagen opcional (puede ser CloudinaryImage o File)
        image: Yup.mixed<CloudinaryImage | File>()
            .test('image-format', 'La imagen debe ser un archivo válido o un objeto Cloudinary', function(value) {
                if (!value) return true; // Es opcional
                
                // Si es un File
                if (value instanceof File) {
                    return value.type.startsWith('image/');
                }
                
                // Si es CloudinaryImage
                if (typeof value === 'object' && 'url' in value && 'public_id' in value) {
                    return typeof value.url === 'string' && typeof value.public_id === 'string';
                }
                
                return false;
            })
            .optional(),

        // Social Media Array
        socialMedia: Yup.array()
            .of(
                Yup.object().shape({
                    id: Yup.number().optional(),
                    typeOfSocialMedia: Yup.mixed<SocialMediaType>()
                        .oneOf(Object.values(SocialMediaType), 'Debe seleccionar un tipo de red social válido')
                        .required('El tipo de red social es requerido'),
                    url: Yup.string()
                        .url('Debe ser una URL válida')
                        .required('La URL es requerida'),
                    playerId: Yup.number().optional()
                })
            )
            .optional()
    });
};

// Schema inicial para campos vacíos (usar cuando no hay players disponibles)
export const initialPlayerFormSchema = Yup.object().shape({
    id: Yup.number().optional(),
    name: Yup.string()
        .min(3, 'El nombre debe tener al menos 3 caracteres')
        .required('El nombre es requerido'),
    number: Yup.number()
        .integer('El número debe ser un entero')
        .min(1, 'El número debe ser mayor a 0')
        .max(99, 'El número debe ser menor a 100')
        .required('El número es requerido'),
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
        goals: Yup.number()
            .integer('Los goles deben ser un entero')
            .min(0, 'Los goles no pueden ser negativos')
            .required('Los goles son requeridos'),
        assists: Yup.number()
            .integer('Las asistencias deben ser un entero')
            .min(0, 'Las asistencias no pueden ser negativas')
            .required('Las asistencias son requeridas'),
        matches: Yup.number()
            .integer('Los partidos deben ser un entero')
            .min(0, 'Los partidos no pueden ser negativos')
            .required('Los partidos son requeridos'),
        yellowCards: Yup.number()
            .integer('Las tarjetas amarillas deben ser un entero')
            .min(0, 'Las tarjetas amarillas no pueden ser negativas')
            .required('Las tarjetas amarillas son requeridas'),
        redCards: Yup.number()
            .integer('Las tarjetas rojas deben ser un entero')
            .min(0, 'Las tarjetas rojas no pueden ser negativas')
            .required('Las tarjetas rojas son requeridas'),
    }),

    // Imagen opcional
    // Imagen opcional (puede ser CloudinaryImage o File)
    image: Yup.mixed<CloudinaryImage | File>()
        .test('image-format', 'La imagen debe ser un archivo válido o un objeto Cloudinary', function(value) {
            if (!value) return true; // Es opcional
            
            // Si es un File
            if (value instanceof File) {
                return value.type.startsWith('image/');
            }
            
            // Si es CloudinaryImage
            if (typeof value === 'object' && 'url' in value && 'public_id' in value) {
                return typeof value.url === 'string' && typeof value.public_id === 'string';
            }
            
            return false;
        })
        .optional(),

    // Social Media Array
    socialMedia: Yup.array()
        .of(
            Yup.object().shape({
                id: Yup.number().optional(),
                typeOfSocialMedia: Yup.mixed<SocialMediaType>()
                    .oneOf(Object.values(SocialMediaType), 'Debe seleccionar un tipo de red social válido')
                    .required('El tipo de red social es requerido'),
                url: Yup.string()
                    .url('Debe ser una URL válida')
                    .required('La URL es requerida'),
                playerId: Yup.number().optional()
            })
        )
        .optional()
});
