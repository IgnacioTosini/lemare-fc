import axios from 'axios';
import { Player } from '../types';
import { playerSchema } from '../schemas/playerSchema';

export const PlayersService = {
    async addPlayer(player: Player) {
        try {
            const result = playerSchema.safeParse(player);
            if (result.success) {
                const response = await axios.post(`${import.meta.env.VITE_LOCAL_BASE_URL}/jugadores`, player);
                return response.data.data; // Retorna la respuesta de la API si es exitosa
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
            throw error; // Lanza el error para manejarlo en el nivel superior
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

    async updatePlayer(player: Player) {
        try {
            const result = playerSchema.safeParse(player);
            if (result.success) {
                const response = await axios.put(`${import.meta.env.VITE_LOCAL_BASE_URL}/jugadores/${player.id}`, player);
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
            const response = await axios.delete(`${import.meta.env.VITE_LOCAL_BASE_URL}/jugadores/${playerId}`);
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