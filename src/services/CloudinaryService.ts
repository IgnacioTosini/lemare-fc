import { CloudinaryImage } from '../types';

export const CloudinaryService = {
    async uploadImage(file: File): Promise<CloudinaryImage> {
        const preset_name = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
        const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
        const folder_name = import.meta.env.VITE_CLOUDINARY_FOLDER || 'lemareFc';

        if (!preset_name || !cloud_name) {
            throw new Error('Cloudinary configuration missing');
        }

        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', preset_name);
        data.append('folder', `${folder_name}/players`); // Subcarpeta para jugadores

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data,
            });

            if (!response.ok) {
                throw new Error('Failed to upload image to Cloudinary');
            }

            const result = await response.json();
            return {
                url: result.secure_url,
                public_id: result.public_id
            };
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            throw error;
        }
    },

    async deleteImage(publicId: string): Promise<void> {
        try {
            // Por ahora implementamos eliminación a través del backend
            const response = await fetch(`${import.meta.env.VITE_LOCAL_BASE_URL}/cloudinary/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ public_id: publicId })
            });

            if (!response.ok) {
                console.error('Failed to delete image from Cloudinary via backend');
                // No lanzar error para que no interrumpa el flujo principal
            } else {
                console.log('Imagen eliminada exitosamente:', publicId);
            }
        } catch (error) {
            console.error('Error deleting image from Cloudinary:', error);
            // No lanzar error para que no interrumpa el flujo principal
        }
    }
};
