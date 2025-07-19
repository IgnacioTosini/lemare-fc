import axios from 'axios';
import { PlayerFormData } from '../types';
import { playerSchema } from '../schemas/playerSchema';
import { CloudinaryService } from './CloudinaryService';

export const PlayersService = {
    async addPlayer(player: PlayerFormData) {
        try {
            // Crear una copia para procesar y adaptarla al backend
            const processedPlayerData = {
                ...player,
                image: null as { url: string; public_id: string } | null
            };

            // Si hay un archivo File como imagen, subirlo a Cloudinary primero
            if (player.image && player.image instanceof File) {
                const uploadedImage = await CloudinaryService.uploadImage(player.image);
                // Enviar el objeto completo CloudinaryImage
                processedPlayerData.image = uploadedImage;

                console.log('Imagen subida con public_id:', uploadedImage.public_id);
            } else if (typeof player.image === 'object' && player.image?.url) {
                // Si es CloudinaryImage, mantenerlo como objeto
                processedPlayerData.image = player.image;
            } else if (typeof player.image === 'string') {
                // Si es string, crear objeto CloudinaryImage básico
                processedPlayerData.image = { url: player.image, public_id: '' };
            }

            const result = playerSchema.safeParse(processedPlayerData);
            if (result.success) {
                const response = await axios.post(`${import.meta.env.VITE_LOCAL_BASE_URL}/jugadores`, processedPlayerData);
                return response.data.data;
            } else {
                console.error('Validation error details:', result.error.errors);
                throw new Error('Validation error');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error adding player:', error.response?.data || error.message);
            } else {
                console.error('Error adding player:', error);
            }
            throw error;
        }
    },

    async getPlayers() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/jugadores`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching players:', error);
            throw error;
        }
    },

    async updatePlayer(player: PlayerFormData, oldImagePublicId?: string) {
        try {
            // Crear una copia para procesar y adaptarla al backend
            const processedPlayerData = {
                ...player,
                image: null as { url: string; public_id: string } | null
            };

            // Si hay un archivo File como imagen, subirlo a Cloudinary primero
            if (player.image && player.image instanceof File) {
                const uploadedImage = await CloudinaryService.uploadImage(player.image);
                processedPlayerData.image = uploadedImage;

                console.log('Imagen actualizada con public_id:', uploadedImage.public_id);

                // Si había una imagen anterior, eliminarla
                if (oldImagePublicId) {
                    await CloudinaryService.deleteImage(oldImagePublicId);
                }
            } else if (typeof player.image === 'object' && player.image?.url) {
                // Si es CloudinaryImage, mantenerlo como objeto
                processedPlayerData.image = player.image;

                // Si se cambió por una imagen diferente (no File), eliminar la anterior
                if (oldImagePublicId && player.image.public_id !== oldImagePublicId) {
                    await CloudinaryService.deleteImage(oldImagePublicId);
                }
            } else if (typeof player.image === 'string') {
                // Si es string, crear objeto CloudinaryImage básico
                processedPlayerData.image = { url: player.image, public_id: '' };
            }

            const result = playerSchema.safeParse(processedPlayerData);
            if (result.success) {
                const response = await axios.put(`${import.meta.env.VITE_LOCAL_BASE_URL}/jugadores/${player.id}`, processedPlayerData);
                return response.data; // Retorna la respuesta de la API si es exitosa
            } else {
                console.error('Validation error details:', result.error.errors);
                throw new Error('Validation error');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error updating player:', error.response?.data || error.message);
                throw new Error(error.response?.data?.message || 'Error updating player');
            } else {
                console.error('Error updating player:', error);
                throw error;
            }
        }
    },

    async deletePlayer(playerId: number) {
        try {
            // Primero obtener los datos del jugador para eliminar su imagen
            const playerData = await this.getPlayerById(playerId);

            // Eliminar el jugador de la base de datos
            const response = await axios.delete(`${import.meta.env.VITE_LOCAL_BASE_URL}/jugadores/${playerId}`);

            // Si la eliminación fue exitosa y el jugador tenía imagen, eliminarla de Cloudinary
            if (response.data && playerData.image &&
                typeof playerData.image === 'object' &&
                playerData.image.public_id) {
                await CloudinaryService.deleteImage(playerData.image.public_id);
            }

            return response.data; // Retorna la respuesta de la API si es exitosa
        } catch (error) {
            console.error('Error deleting player:', error);
            throw error;
        }
    },

    async getPlayerById(playerId: number) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/jugadores/${playerId}`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching player by ID:', error);
            throw error;
        }
    },

    async getPlayerStats(playerId: number) {
        try {
            const response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/jugadores/${playerId}/stats`);
            return response.data.data;
        } catch (error) {
            console.error('Error fetching player stats:', error);
            throw error;
        }
    },
};