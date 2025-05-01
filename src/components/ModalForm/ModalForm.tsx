import { ChangeEvent, FormEvent, useState } from 'react';
import { Player } from '../../types';
import { PlayerInfoForm } from '../PlayerInfoForm/PlayerInfoForm';
import { StatsForm } from '../StatsForm/StatsForm';
import { SocialMediaForm } from '../SocialMediaForm/SocialMediaForm';
import './_modalForm.scss';

type ModalFormProps = {
    player?: Player;
    onClose: () => void;
    onSave: (updatedPlayer: Player) => void;
};

export const ModalForm = ({ player, onClose, onSave }: ModalFormProps) => {
    const [formData, setFormData] = useState<Player>(player || { ...{} as Player, socialMedia: [] });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="modal">
            <div className="modalContent">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 className='title'>Editar Jugador/Staff</h2>
                <form onSubmit={handleSubmit}>
                    <PlayerInfoForm formData={formData} handleChange={handleChange} />
                    <h2>Estadísticas</h2>
                    <StatsForm formData={formData} handleChange={handleChange} />
                    <h2>Redes Sociales</h2>
                    <SocialMediaForm formData={formData} setFormData={setFormData} />
                    <div className='buttonContainer'>
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};