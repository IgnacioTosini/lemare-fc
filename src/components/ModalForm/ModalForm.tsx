import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Player } from '../../types';
import { PlayerInfoForm } from '../PlayerInfoForm/PlayerInfoForm';
import { StatsForm } from '../StatsForm/StatsForm';
import { SocialMediaForm } from '../SocialMediaForm/SocialMediaForm';
import { toast } from 'react-toastify';
import { SocialMediaType } from '../../types/socialMedia';
import { usePlayerContext } from '../../context/playerStore';
import { generateErrorMessages, isNumberDuplicate } from '../../utils/formErrorMessages';
import 'react-toastify/dist/ReactToastify.css';
import { validateForm } from '../../utils/validateForm';
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
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        setIsFormValid(validateForm(formData, player));
    }, [formData, player?.name]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.description) {
            setError('Por favor, complete todos los campos obligatorios.');
            return;
        }
        setError(null);

        if (isNumberDuplicate(formData.number, players) && (!player || player.id !== players.find(p => p.number === formData.number)?.id)) {
            toast.error('El número ingresado ya está asignado a otro jugador. Por favor, elige otro.');
            return;
        }

        // Normalizar los valores de typeOfSocialMedia a minúsculas
        const normalizedFormData = {
            ...formData,
            socialMedia: formData.socialMedia?.map(social => ({
                ...social,
                typeOfSocialMedia: social.typeOfSocialMedia.toLocaleLowerCase() as SocialMediaType,
            })),
        };

        if (!isFormValid) {
            const isValid = generateErrorMessages(formData);
            if (!isValid) return;
        }

        if (isFormValid) {
            try {
                if (normalizedFormData.id) {
                    await handleSave(normalizedFormData); // Usar handleSave del contexto
                } else {
                    await handleAddPlayer(normalizedFormData); // Usar handleAddPlayer del contexto
                }
                setFormData({ ...{} as Player, stats: { goals: 0, assists: 0, matches: 0, yellowCards: 0, redCards: 0 }, socialMedia: [], description: '', name: '' });
                onClose(); // Cierra el modal
            } catch (error) {
                console.error('Error en handleSubmit:', error);
                toast.error('Ocurrió un error al guardar los datos.');
            }
        } else {
            console.warn('Formulario no válido:', normalizedFormData);
            toast.error('Por favor, corrige los errores o complete los datos necesarios antes de guardar.');
        }
    };

    return (
        <div className="modal">
            <div className="modalContent">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 className='title'>Editar Jugador/Staff</h2>
                <form onSubmit={handleSubmit}>
                    <PlayerInfoForm formData={formData} handleChange={handleChange} setFormData={setFormData} />
                    <h2>Estadísticas</h2>
                    <StatsForm formData={formData} handleChange={handleStatsChange} />
                    <h2>Redes Sociales</h2>
                    <SocialMediaForm formData={formData} setFormData={setFormData} />
                    {error && <p className="errorMessage">{error}</p>} {/* Mejora: mostrar mensaje de error */}
                    <div className='buttonContainer'>
                        <button type="submit" disabled={isLoading}>{isLoading ? 'Guardando...' : 'Guardar'}</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};