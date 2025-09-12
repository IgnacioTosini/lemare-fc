import { PlayerImage } from "../types";

// Hook para transformar URLs de Cloudinary a formato WebP
export function useCloudinaryWebp() {
    return (image: PlayerImage) => {
        if (!image) return '';
        if (image.url.includes('res.cloudinary.com')) {
            return image.url.replace('/upload/', '/upload/f_webp/');
        }
        return image.url;
    };
}
