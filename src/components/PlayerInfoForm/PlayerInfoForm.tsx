import { ChangeEvent } from 'react';
import { Player } from '../../types';
import { Position } from '../../types/positions';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { Cloudinary } from '../Cloudinary/Cloudinary';
import './_playerInfoForm.scss';

export const PlayerInfoForm = ({ formData, handleChange, setFormData, handleBlur }: { formData: Player, handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void, setFormData: React.Dispatch<React.SetStateAction<Player>>, handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void }) => {
    const handleImageUpload = (url: string) => {
        setFormData({ ...formData, image: url });
    };

    return (
        <section className="playerInfoForm">
            <label>
                Nombre
                <input type="text" name="name" value={formData.name} onChange={handleChange} onBlur={handleBlur} placeholder='Nombre' />
                {formData.name && formData.name.length < 3 && <p className="error">El nombre debe tener al menos 3 caracteres.</p>}
            </label>
            <label>
                Imagen
                <Cloudinary onUpload={handleImageUpload} preImage={formData.image} />
            </label>
            <label>
                Número
                <input type="number" name="number" value={formData.number || ''} onChange={handleChange} onBlur={handleBlur} placeholder='5' />
                {formData.number && (formData.number < 1 || formData.number > 99) && <p className="error">El número debe estar entre 1 y 99.</p>}
            </label>
            <label>
                País
                <input type="text" name="country" value={formData.country || ''} onChange={handleChange} onBlur={handleBlur} placeholder='Argentina' />
                {formData.country && formData.country.length < 3 && <p className="error">El país debe tener al menos 3 caracteres.</p>}
            </label>
            <label>
                Posición
                <CustomSelect
                    type={Position}
                    selectedValue={formData.position || ''}
                    handleChange={handleChange}
                    name="position"
                    disabledOptions={['Admin']}
                />
                {formData.position ? null : <p>Debe elegir una posición</p>}
            </label>
            <label>
                Edad
                <input type='number' name="age" value={formData.age || ''} onChange={handleChange} onBlur={handleBlur} placeholder='24' />
                {formData.age && (formData.age < 1 || formData.age > 99) && <p className="error">La edad debe estar entre 1 y 99.</p>}
            </label>
            <label>
                Año de nacimiento
                <input type='number' name="year" value={formData.year || ''} onChange={handleChange} onBlur={handleBlur} placeholder='1999' />
                {formData.year && (new Date().getFullYear() - formData.year < 1 || new Date().getFullYear() - formData.year > 99) && <p className="error">El año de nacimiento no es válido.</p>}
            </label>
            <label>
                Altura
                <input type='number' name="height" value={formData.height || ''} onChange={handleChange} onBlur={handleBlur} placeholder='1.80' />
                {formData.height && (formData.height < 1 || formData.height > 3) && <p className="error">La altura debe estar entre 1 y 3 metros.</p>}
            </label>
            <label className='description'>
                Descripción
                <textarea name="description" value={formData.description || ''} onChange={handleChange} onBlur={handleBlur}></textarea>
                {formData.description && formData.description.length < 3 && <p className="error">La descripción debe tener al menos 3 caracteres.</p>}
            </label>
        </section>
    );
};