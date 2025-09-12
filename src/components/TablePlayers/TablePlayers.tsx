import { RowPlayerCard } from '../RowPlayerCard/RowPlayerCard';
import { ModalForm } from '../ModalForm/ModalForm';
import { FilterList } from '../FilterList/FilterList';
import { usePlayerContext } from '../../context/playerStore';
import './_tablePlayers.scss';

export const TablePlayers = () => {
    const {
        players,
        error,
        editingPlayer,
        openMenuId,
        filteredPlayers,
        handleFilter,
        handleEdit,
    } = usePlayerContext();

    return (
        <div className='tablePlayers'>
            <section className='tablePlayersHeader'>
                <h1 className='title'>Gestión de Jugadores y Staff</h1>
                <p>Añade, edita o elimina jugadores y miembros del staff técnico.</p>
            </section>
            {error && <p className='error'>{error}</p>}
            <FilterList team={players} onFilter={handleFilter} />
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
                        <th>Activo</th>
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
                            isMenuOpen={openMenuId === player.id}
                        />
                    ))}
                </tbody>
            </table>
            {editingPlayer && (
                <ModalForm
                    player={editingPlayer}
                    onClose={() => handleEdit(null)}
                />
            )}
        </div>
    );
};
