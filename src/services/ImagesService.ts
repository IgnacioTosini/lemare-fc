import axios from "axios";
import { PlayerImage } from "../types";

const API_URL = import.meta.env.VITE_LOCAL_BASE_URL + "/images";

export class ImagesService {
    static async uploadImages(playerId: number, files: File[]): Promise<PlayerImage[]> {
        const formData = new FormData();
        files.forEach(file => formData.append("files", file));
        formData.append("playerId", String(playerId));

        const response = await axios.post<{ data: PlayerImage[] }>(API_URL, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data.data;
    }

    static async deleteImage(publicId: string): Promise<void> {
        await axios.delete(`${API_URL}/${publicId}`);
    }
}