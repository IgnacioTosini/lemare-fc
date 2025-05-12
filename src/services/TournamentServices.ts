import axios from 'axios';
import { Match, TournamentTable } from '../types';

export const TournamentService = {
    async getTournamentTable(): Promise<TournamentTable> {
        try {
            const response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/tournament/table`);
            return response.data;
        } catch (error) {
            console.error('Error fetching tournament table:', error);
            throw error;
        }
    },

    async getMainTeamMatchInfo(): Promise<Match> {
        try {
            const response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/tournament/main-team-match`);
            return response.data;
        } catch (error) {
            console.error('Error fetching main team match info:', error);
            throw error;
        }
    },

    async getAllMatches(): Promise<Match[]> {
        try {
            const response = await axios.get(`${import.meta.env.VITE_LOCAL_BASE_URL}/tournament/matches`);
            return response.data;
        } catch (error) {
            console.error('Error fetching all matches:', error);
            throw error;
        }
    }
};
