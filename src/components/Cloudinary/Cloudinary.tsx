import { useState } from 'react';
import './_cloudinary.scss'

type CloudinaryProps = {
    onUpload: (url: string) => void;
    preImage?: string;
};

export const Cloudinary = ({ onUpload, preImage }: CloudinaryProps) => {
    const [image, setImage] = useState<string>(preImage || '');
    const preset_name = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const cloud_name = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    const [loading, setLoading] = useState(false);

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', preset_name);

        setLoading(true);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
                method: 'POST',
                body: data,
            });

            const file = await response.json();
            onUpload(file.secure_url);
            setImage(file.secure_url);
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="file"
                name="file"
                placeholder="Upload an image"
                onChange={uploadImage}
                disabled={loading}
            />
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                image && <img src={image} className='preview' alt="imagen subida" loading="lazy" />
            )}
        </div>
    );
};