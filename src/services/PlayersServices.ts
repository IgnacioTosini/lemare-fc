import axios from "axios";
import { Player } from "../types";
import { ApiResponse } from "../types/ApiResponse";

const API_URL = import.meta.env.VITE_LOCAL_BASE_URL + "/jugadores";

export class PlayersService {
    static async getPlayers(): Promise<Player[]> {
        const response = await axios.get<ApiResponse<Player[]>>(API_URL);
        return response.data.data;
    }

    static async getPlayerById(playerId: number): Promise<Player> {
        const response = await axios.get<ApiResponse<Player>>(`${API_URL}/${playerId}`);
        return response.data.data;
    }

    static async addPlayer(player: Player, images?: File[]): Promise<Player> {
        const formData = new FormData();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { createdAt, ...playerWithoutCreatedAt } = player;

        formData.append("player", JSON.stringify(playerWithoutCreatedAt));

        if (images && images.length > 0) {
            images.forEach((file) => formData.append("images", file));
        }
        const response = await axios.post<ApiResponse<Player>>(
            `${API_URL}`,
            formData,
            {
                headers: {
                    Accept: "application/json",
                },
                transformRequest: [(data) => data],
            }
        );
        return response.data.data;
    }

    static async updatePlayer(id: number, player: Player, images?: File[], imagesToRemove?: number[]): Promise<Player> {
        const formData = new FormData();

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { createdAt, ...playerWithoutCreatedAt } = player;

        formData.append("player", JSON.stringify(playerWithoutCreatedAt));

        if (images && images.length > 0) {
            images.forEach((file) => formData.append("images", file));
        }

        if (imagesToRemove && imagesToRemove.length > 0) {
            formData.append("imagesToRemove", JSON.stringify(imagesToRemove));
        }

        const response = await axios.put<ApiResponse<Player>>(
            `${API_URL}/${id}`,
            formData,
            {
                headers: {
                    Accept: "application/json",
                },
                transformRequest: [(data) => data],
            }
        );

        return response.data.data;
    }

    static async desactivatePlayer(playerId: number, active: boolean): Promise<void> {
        await axios.delete(`${API_URL}/${playerId}?active=${active}`);
    }

    static async deletePlayer(playerId: number): Promise<void> {
        await axios.delete(`${API_URL}/hard/${playerId}`);
    }
}