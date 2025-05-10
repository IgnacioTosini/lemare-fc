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

export const RowPlayerCard = ({ player, isMenuOpen }: RowPlayerCardProps) => {
    const { handleEdit, handleDelete, handleToggleMenu, isLoading } = usePlayerContext();
    const getPositionColor = (position?: Position) => {
        const normalizedPosition = position?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        switch (normalizedPosition) {
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
            <td><img src={player.image} className='playerImage' alt={player.name} /></td>
            <td>{player.name}</td>
            <td>{player.number || '-'}</td>
            <td><span className={`${getPositionColor(player.position)}`}>{player.position}</span></td>
            <td>{player.country}</td>
            <td>{player.age}</td>
            <td>
                <div className='menuContainer'>
                    <button className='btn' onClick={() => handleToggleMenu(player.id)}><IoIosMore /></button>
                    {isMenuOpen && (
                        <div className='submenu'>
                            <button onClick={() => handleEdit(player)}>Editar</button>
                            <button onClick={async () => {
                                await handleDelete(player.id);
                                handleToggleMenu(null);
                            }}>{isLoading ? 'Eliminando...' : 'Eliminar'}</button>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};
