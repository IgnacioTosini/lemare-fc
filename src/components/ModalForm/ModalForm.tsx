import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Player } from '../../types';
import { PlayerInfoForm } from '../PlayerInfoForm/PlayerInfoForm';
import { StatsForm } from '../StatsForm/StatsForm';
import { SocialMediaForm } from '../SocialMediaForm/SocialMediaForm';
import { toast } from 'react-toastify';
import { SocialMediaType } from '../../types/socialMedia';
import { usePlayerContext } from '../../context/playerStore';
import { isNumberDuplicate } from '../../utils/formErrorMessages';
import { validateForm } from '../../utils/validateForm';
import 'react-toastify/dist/ReactToastify.css';
import './_modalForm.scss';

type ModalFormProps = {
    player?: Player;
    onClose: () => void;
};

type StatsChangeEvent = {
    target: {
        name: string;
        value: {
            goals: number;
            assists: number;
            matches: number;
            yellowCards: number;
            redCards: number;
        };
    };
};

export const ModalForm = ({ player, onClose }: ModalFormProps) => {
    const { handleAddPlayer, handleSave, players, isLoading } = usePlayerContext();
    const [formData, setFormData] = useState<Player>(player || { ...{} as Player, stats: { goals: 0, assists: 0, matches: 0, yellowCards: 0, redCards: 0 }, socialMedia: [], description: '', name: '' });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [error, setError] = useState<string | null>(null);
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Convertir valores específicos a números si es necesario
        const convertedValue = ['number', 'age', 'year', 'height'].includes(name) ? Number(value) : value;

        setFormData({ ...formData, [name]: convertedValue });
    };

    const handleStatsChange = (e: ChangeEvent<HTMLInputElement> | StatsChangeEvent) => {
        if ('value' in e.target && typeof e.target.value === 'object') {
            // Caso StatsChangeEvent
            const { value } = e.target;
            setFormData({ ...formData, stats: value });
        } else {
            // Caso ChangeEvent<HTMLInputElement>
            const { name, value } = e.target;
            setFormData({
                ...formData,
                stats: {
                    ...formData.stats,
                    [name]: Number(value),
                },
            });
        }
    };

    const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name } = e.target;
        setTouchedFields({ ...touchedFields, [name]: true });
    };

    useEffect(() => {
        const errors = validateForm(formData);
        setFormErrors(errors);
    }, [formData]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const errors = validateForm(formData);
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach((message) => {
                toast.error(message, { autoClose: 5000 }); // Mostrar cada error como un mensaje separado
            });
            console.warn('Errores de validación:', errors);
            return;
        }

        setError(null);

        if (isNumberDuplicate(formData.number, players) && (!player || player.id !== players.find(p => p.number === formData.number)?.id)) {
            toast.error('El número ingresado ya está asignado a otro jugador. Por favor, elige otro.');
            return;
        }

        const normalizedFormData = {
            ...formData,
            socialMedia: formData.socialMedia?.map(social => ({
                ...social,
                typeOfSocialMedia: social.typeOfSocialMedia.toLocaleLowerCase() as SocialMediaType,
            })),
        };

        try {
            if (normalizedFormData.id) {
                await handleSave(normalizedFormData);
            } else {
                await handleAddPlayer(normalizedFormData);
            }
            setFormData({ ...{} as Player, stats: { goals: 0, assists: 0, matches: 0, yellowCards: 0, redCards: 0 }, socialMedia: [], description: '', name: '' });
            onClose();
        } catch (error) {
            console.error('Error en handleSubmit:', error);
            toast.error('Ocurrió un error al guardar los datos.');
        }
    };

    return (
        <div className="modal">
            <div className="modalContent">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 className='title'>Editar Jugador/Staff</h2>
                <form onSubmit={handleSubmit}>
                    <PlayerInfoForm formData={formData} handleChange={handleChange} setFormData={setFormData} handleBlur={handleBlur} />
                    <h2>Estadísticas</h2>
                    <StatsForm formData={formData} handleChange={handleStatsChange} handleBlur={handleBlur} />
                    <h2>Redes Sociales</h2>
                    <SocialMediaForm formData={formData} setFormData={setFormData} handleBlur={handleBlur} />
                    {error && <p className="errorMessage">{error}</p>} {/* Mejora: mostrar mensaje de error */}
                    {Object.entries(formErrors).map(([field, message]) => (
                        <p key={field} className="errorMessage">{message}</p>
                    ))}
                    <div className='buttonContainer'>
                        <button type="submit" disabled={isLoading}>{isLoading ? 'Guardando...' : 'Guardar'}</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};