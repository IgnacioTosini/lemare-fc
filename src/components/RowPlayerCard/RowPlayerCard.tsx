import { IoIosMore } from 'react-icons/io';
import { Player } from '../../types';
import './_rowPlayerCard.scss';

type RowPlayerCardProps = {
    player: Player;
    onEdit: (player: Player) => void;
    isMenuOpen: boolean;
    onToggleMenu: (playerId: number) => void;
};

export const RowPlayerCard = ({ player, onEdit, isMenuOpen, onToggleMenu }: RowPlayerCardProps) => {
    const getPositionColor = (position?: string) => {
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

    const handleEdit = () => {
        onEdit(player);
        onToggleMenu(player.id);
    };

    const handleDelete = () => {
        console.log(`Deleting player with ID: ${player.id}`);
        onToggleMenu(player.id);
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
                    <button className='btn' onClick={() => onToggleMenu(player.id)}><IoIosMore /></button>
                    {isMenuOpen && (
                        <div className='submenu'>
                            <button onClick={handleEdit}>Editar</button>
                            <button onClick={handleDelete}>Eliminar</button>
                        </div>
                    )}
                </div>
            </td>
        </tr>
    );
};
