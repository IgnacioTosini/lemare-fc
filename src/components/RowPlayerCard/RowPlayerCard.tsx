import { memo } from 'react';
import { IoIosMore } from 'react-icons/io';
import { Player } from '../../types';
import { Position } from '../../types/positions';
import { usePlayerContext } from '../../context/playerStore';
import 'react-toastify/dist/ReactToastify.css';
import './_rowPlayerCard.scss';

type RowPlayerCardProps = {
    player: Player;
    isMenuOpen: boolean;
};

export const RowPlayerCard = memo(({ player, isMenuOpen }: RowPlayerCardProps) => {
    const { handleEdit, handleDesactivate, handleDelete, handleToggleMenu, isLoading } = usePlayerContext();

    const getPositionColor = (position?: Position) => {
        const normalizedPosition = position?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        switch (normalizedPosition) {
            case "admin":
                return "admin";
            case "arquero":
                return "arquero";
            case "defensor":
                return "defensor";
            case "mediocampista":
                return "mediocampista";
            case "delantero":
                return "delantero";
            case "cuerpo tecnico":
                return "cuerpo-tecnico";
            default:
                return "default";
        }
    };

    return (
        <tr>
            <td>{player.id}</td>
            <td><img src={player.images?.[0]?.url || '../siluetaJugador.jpg'} className='playerImage' alt={player.name} loading="lazy" width="50" height="50" /></td>
            <td>{player.name}</td>
            <td>{player.number || '-'}</td>
            <td><span className={`${getPositionColor(player.position!)}`}>{player.position}</span></td>
            <td>{player.country}</td>
            <td>{player.age}</td>
            <td>{player.active ? 'Sí' : 'No'}</td>
            <td>
                <div className='menuContainer'>
                    <button className='btn' onClick={() => handleToggleMenu(player.id)}><IoIosMore /></button>
                    {isMenuOpen && (
                        <div className='submenu'>
                            <button onClick={() => handleEdit(player)}>Editar</button>
                            <button onClick={async () => {
                                await handleDesactivate(player.id, player.active ? false : true);
                                handleToggleMenu(null);
                            }}>{isLoading ? (player.active ? 'Desactivando...' : 'Activando...') : (player.active ? 'Desactivar' : 'Activar')}</button>
                            <button onClick={async () => {
                                await handleDelete(player.id);
                                handleToggleMenu(null);
                            }}>{isLoading ? 'Eliminando' : 'Eliminar'}</button>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
});
