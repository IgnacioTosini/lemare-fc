import { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Player, PlayerFormData } from '../../types';
import { Position } from '../../types/positions';
import { PlayerInfoForm } from '../PlayerInfoForm/PlayerInfoForm';
import { StatsForm } from '../StatsForm/StatsForm';
import { SocialMediaForm } from '../SocialMediaForm/SocialMediaForm';
import { toast } from 'react-toastify';
import { SocialMediaType } from '../../types/socialMedia';
import { usePlayerContext } from '../../context/playerStore';
import { createPlayerFormSchema, PlayerFormValues } from '../../schemas/playerFormSchema';
import 'react-toastify/dist/ReactToastify.css';
import './_modalForm.scss';

type ModalFormProps = {
    player?: Player;
    onClose: () => void;
};

export const ModalForm = ({ player, onClose }: ModalFormProps) => {
    const { handleAddPlayer, handleSave, players, isLoading, refreshPlayers } = usePlayerContext();

    // Refrescar los jugadores cuando se abre el modal para asegurar datos actualizados
    useEffect(() => {
        refreshPlayers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Solo se ejecuta una vez al montar el componente

    // Función para encontrar el primer número disponible
    const getFirstAvailableNumber = (): number => {
        const usedNumbers = players.map(p => p.number).filter((num): num is number => num !== undefined);

        for (let i = 1; i <= 99; i++) {
            if (!usedNumbers.includes(i)) {
                return i;
            }
        }
        return 1; // Fallback
    };

    const getInitialValues = (): PlayerFormValues => {
        if (player) {
            return {
                id: player.id,
                name: player.name || '',
                image: player.image || '',
                number: player.number,
                year: player.year || new Date().getFullYear() - 20,
                age: player.age || 20,
                country: player.country || '',
                height: player.height || 1.75,
                position: player.position || Position.DEFENSOR,
                description: player.description || '',
                stats: {
                    goals: player.stats?.goals || 0,
                    assists: player.stats?.assists || 0,
                    matches: player.stats?.matches || 0,
                    yellowCards: player.stats?.yellowCards || 0,
                    redCards: player.stats?.redCards || 0,
                },
                socialMedia: player.socialMedia?.map(social => ({
                    typeOfSocialMedia: social.typeOfSocialMedia,
                    url: Array.isArray(social.url) ? social.url[0] : social.url
                })) || [],
            };
        }

        return {
            name: '',
            image: {
                url: '',
                public_id: ''
            },
            number: getFirstAvailableNumber(), // Asignar automáticamente el primer número disponible
            year: new Date().getFullYear() - 20,
            age: 20,
            country: '',
            height: 1.75,
            position: Position.DEFENSOR,
            description: '',
            stats: {
                goals: 0,
                assists: 0,
                matches: 0,
                yellowCards: 0,
                redCards: 0,
            },
            socialMedia: [],
        };
    };

    const handleSubmit = async (values: PlayerFormValues, { resetForm }: { resetForm: () => void }) => {
        const normalizedFormData: PlayerFormData = {
            // Solo incluir ID si estamos editando un jugador existente
            ...(player ? { id: player.id } : {}),
            name: values.name,
            image: values.image, // Mantener como File o CloudinaryImage
            number: values.number,
            year: values.year,
            age: values.age,
            country: values.country,
            height: values.height,
            position: values.position,
            description: values.description,
            stats: values.stats,
            socialMedia: values.socialMedia?.map(social => ({
                ...social,
                typeOfSocialMedia: social.typeOfSocialMedia.toLowerCase() as SocialMediaType,
                url: social.url // Asegurarse de que sea string, no array
            })),
        } as PlayerFormData;

        try {
            if (player) {
                await handleSave(normalizedFormData);
                toast.success('Jugador actualizado correctamente.');
            } else {
                await handleAddPlayer(normalizedFormData);
                // Solo resetear el formulario cuando se agrega un nuevo jugador
                resetForm();
                toast.success('Jugador agregado correctamente. El formulario se ha reseteado.');
            }
            onClose();
        } catch (error) {
            console.error('Error en handleSubmit:', error);
            // Manejar errores específicos del servidor
            if (error && typeof error === 'object' && 'response' in error) {
                const axiosError = error as { response: { data: { error: string } } };
                if (axiosError.response?.data?.error) {
                    toast.error(axiosError.response.data.error);
                } else {
                    toast.error('Ocurrió un error al guardar los datos.');
                }
            } else {
                toast.error('Ocurrió un error al guardar los datos.');
            }
        }
    };

    return (
        <div className="modal">
            <div className="modalContent">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 className='title'>Editar Jugador/Staff</h2>

                <Formik
                    initialValues={getInitialValues()}
                    validationSchema={createPlayerFormSchema(players, player?.id)}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <PlayerInfoForm
                                formData={values}
                                setFieldValue={setFieldValue}
                            />
                            <h2>Estadísticas</h2>
                            <StatsForm />
                            <h2>Redes Sociales</h2>
                            <SocialMediaForm
                                formData={values}
                                setFieldValue={setFieldValue}
                            />

                            <div className='buttonContainer'>
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? 'Guardando...' : 'Guardar'}
                                </button>
                                <button type="button" onClick={onClose}>Cancelar</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};