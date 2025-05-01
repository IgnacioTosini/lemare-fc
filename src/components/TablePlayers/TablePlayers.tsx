import { useState } from 'react';
import { players } from '../../utils/players';
import { RowPlayerCard } from '../RowPlayerCard/RowPlayerCard';
import { ModalForm } from '../ModalForm/ModalForm';
import { Player } from '../../types';
import { FilterList } from '../FilterList/FilterList';
import './_tablePlayers.scss';

export const TablePlayers = () => {
    const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
    const [openMenuId, setOpenMenuId] = useState<number | null>(null);
    const [filteredPlayers, setFilteredPlayers] = useState<Player[]>(players);

    const handleEdit = (player: Player) => {
        setEditingPlayer(player);
    };

    const handleSave = (updatedPlayer: Player) => {
        console.log('Updated player:', updatedPlayer);
        setEditingPlayer(null);
    };

    const handleToggleMenu = (playerId: number) => {
        setOpenMenuId((prevId) => (prevId === playerId ? null : playerId));
    };

    return (
        <div className='tablePlayers'>
            <section className='tablePlayersHeader'>
                <h1 className='title'>Gestión de Jugadores y Staff</h1>
                <p>Añade, edita o elimina jugadores y miembros del staff técnico.</p>
            </section>
            <FilterList team={players} onFilter={setFilteredPlayers} />
            <table className='table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Número</th>
                        <th>Posición</th>
                        <th>País</th>
                        <th>Edad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPlayers.length === 0 && (
                        <tr><td colSpan={8}>No hay jugadores/Staff disponibles.</td></tr>
                    )}
                    {filteredPlayers.map((player) => (
                        <RowPlayerCard
                            key={player.id}
                            player={player}
                            onEdit={handleEdit}
                            isMenuOpen={openMenuId === player.id}
                            onToggleMenu={handleToggleMenu}
                        />
                    ))}
                </tbody>
            </table>
            {editingPlayer && (
                <ModalForm
                    player={editingPlayer}
                    onClose={() => setEditingPlayer(null)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};
