import { usePlayerContext } from '../../context/playerStore';
import { PlayerCard } from '../../components/PlayerCard/PlayerCard';
import { PlayerCardSkeleton } from '../../components/PlayerCardSkeleton/PlayerCardSkeleton';
import './_playersPage.scss';

export const PlayersPage = () => {
    const { players: originalPlayers, isLoading } = usePlayerContext();

    // Agrupar jugadores por posición
    const groupedPlayers = originalPlayers.reduce((acc: Record<string, typeof originalPlayers>, player) => {
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
            {(isLoading || originalPlayers.length === 0) && (
                <div className='playerList'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <PlayerCardSkeleton key={index} />
                    ))}
                </div>
            )}
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
