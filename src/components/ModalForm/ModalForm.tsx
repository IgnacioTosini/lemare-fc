import { useState } from "react";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { usePlayerContext } from "../../context/playerStore";
import { createPlayerFormSchema, PlayerFormValues } from "../../schemas/playerFormSchema";
import { PlayerInfoForm } from "../PlayerInfoForm/PlayerInfoForm";
import { StatsForm } from "../StatsForm/StatsForm";
import { SocialMediaForm } from "../SocialMediaForm/SocialMediaForm";
import { PlayersService } from "../../services/PlayersServices";
import { ImagesService } from "../../services/ImagesService";
import { Position } from "../../types/positions";
import { Player, PlayerImage } from "../../types";
import "./_modalForm.scss";

type ModalFormProps = {
    player?: Player;
    onClose: () => void;
};

export const ModalForm = ({ player, onClose }: ModalFormProps) => {
    const { players, isLoading, handleUpsertPlayer } = usePlayerContext();
    const [removedImages, setRemovedImages] = useState<PlayerImage[]>([]);

    const getInitialValues = (): PlayerFormValues => {
        if (player) return { ...player, images: player.images || [] };
        return {
            name: "",
            images: [],
            number: 1,
            year: new Date().getFullYear() - 20,
            age: 20,
            country: "",
            height: 1.75,
            position: Position.DEFENSOR,
            description: "",
            stats: {
                goals: 0,
                assists: 0,
                matchesPlayed: 0,
                yellow_cards: 0,
                red_cards: 0,
            },
            socialMedia: [],
            active: true,
            id: undefined,
        };
    };

    const handleSubmit = async (
        values: PlayerFormValues,
        { resetForm }: { resetForm: () => void }
    ) => {
        try {
            const { images, id, ...playerPayload } = values;
            const imagesToRemove = removedImages.map(img => img.id); // 🔹 IDs a eliminar

            let savedPlayer: Player;
            if (player) {
                savedPlayer = await PlayersService.updatePlayer(
                    id!,
                    playerPayload as Player,
                    images?.filter(i => i instanceof File) as File[],
                    imagesToRemove // 🔹 enviamos las eliminadas
                );
                toast.success("Jugador actualizado correctamente.");
                // Actualizamos la lista local con la respuesta del backend
                handleUpsertPlayer(savedPlayer);
            } else {
                savedPlayer = await PlayersService.addPlayer(playerPayload as Player);
                // si hay archivos nuevos, upload aparte
                if (images && images.length > 0) {
                    const newFiles = images.filter(i => i instanceof File) as File[];
                    await ImagesService.uploadImages(savedPlayer.id, newFiles);
                    // Si la API de upload images devuelve info adicional se podría actualizar aquí
                }
                toast.success("Jugador agregado correctamente.");
                // Insertamos el nuevo jugador en la lista local
                handleUpsertPlayer(savedPlayer);
                resetForm();
            }

            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Ocurrió un error al guardar los datos.");
        }
    };

    return (
        <div className="modal">
            <div className="modalContent">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 className="title">Editar Jugador/Staff</h2>

                <Formik
                    initialValues={getInitialValues()}
                    validationSchema={createPlayerFormSchema(players, player?.id)}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <PlayerInfoForm
                                formData={values}
                                setFieldValue={setFieldValue}
                                setRemovedImages={setRemovedImages}
                            />

                            <h2>Estadísticas</h2>
                            <StatsForm />
                            <h2>Redes Sociales</h2>
                            <SocialMediaForm formData={values} setFieldValue={setFieldValue} />

                            <div className="buttonContainer">
                                <button type="submit" disabled={isLoading}>
                                    {isLoading ? "Guardando..." : "Guardar"}
                                </button>
                                <button type="button" onClick={onClose}>
                                    Cancelar
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};
