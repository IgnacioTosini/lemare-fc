import { PlayerCard } from '../../components/PlayerCard/PlayerCard';
import { players } from '../../utils/players';
import './_playersPage.scss';

export const PlayersPage = () => {

    // Agrupar jugadores por posición
    const groupedPlayers = players.reduce((acc: Record<string, typeof players>, player) => {
        if (player.position) {
            if (!acc[player.position]) {
                acc[player.position] = [];
            }
            acc[player.position].push(player);
        }
        return acc;
    }, {});

    return (
        <div className='playersPage'>
            <div className='playersPageHeader'>
                <h1>Nuestros Jugadores</h1>
                <p>Conoce a los protagonistas que defienden los colores de Lemare FC en cada partido. Un equipo unido por la pasión y el compromiso.</p>
            </div>
            <div className='playerList'>
                {Object.entries(groupedPlayers).map(([position, players]) => (
                    <div key={position} className='playerGroup'>
                        <h2 className='positionHeader'>{`${position}/s`}</h2>
                        <div className='playerCards'>
                            {players.map(player => (
                                    <PlayerCard key={player.id} player={player} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
