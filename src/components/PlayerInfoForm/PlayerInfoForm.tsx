import { ChangeEvent, useState } from 'react';
import { Player } from '../../types';
import { Position } from '../../types/positions';
import { CustomSelect } from '../CustomSelect/CustomSelect';

export const PlayerInfoForm = ({ formData, handleChange }: { formData: Player, handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void }) => {
    const [imageError, setImageError] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validExtensions.includes(file.type)) {
                setImageError('Por favor, sube una imagen válida (JPEG o PNG).');
                setPreviewImage(null);
                return;
            }

            setImageError(null);
            const reader = new FileReader();
            reader.onload = () => {
                const base64String = reader.result as string;
                setPreviewImage(base64String);
                handleChange({
                    target: {
                        name: 'image',
                        value: base64String,
                    },
                } as ChangeEvent<HTMLInputElement>);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <section className="playerInfoForm">
            <label>
                Nombre
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Nombre' />
            </label>
            <label>
                Imagen
                <input type="file" name="image" onChange={handleImageChange} />
                {imageError && <p className="error">{imageError}</p>}
                {previewImage && (
                    <div className="image-preview" style={{ marginTop: '10px' }}>
                        <img src={previewImage} alt="Previsualización" style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }} />
                    </div>
                )}
            </label>
            <label>
                Número
                <input type="number" name="number" value={formData.number || ''} onChange={handleChange} placeholder='5' />
            </label>
            <label>
                País
                <input type="text" name="country" value={formData.country || ''} onChange={handleChange} placeholder='Brasil' />
            </label>
            <label>
                Posición
                <CustomSelect
                    type={Position}
                    selectedValue={formData.position || ''}
                    handleChange={handleChange}
                    name="position"
                />
            </label>
            <label>
                Edad
                <input type='number' name="age" value={formData.age || ''} onChange={handleChange} placeholder='24' />
            </label>
            <label>
                Año de nacimiento
                <input type='number' name="year" value={formData.year || ''} onChange={handleChange} placeholder='1999' />
            </label>
            <label>
                Altura
                <input type='number' name="height" value={formData.height || ''} onChange={handleChange} placeholder='1.80' />
            </label>
            <label className='description'>
                Descripción
                <textarea name="description" value={formData.description || ''} onChange={handleChange}></textarea>
            </label>
        </section>
    );
};