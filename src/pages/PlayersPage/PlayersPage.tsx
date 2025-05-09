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
        <section className='playersPage'>
            <header className='playersPageHeader'>
                <h1>Nuestros Jugadores</h1>
                <p>Conoce a los protagonistas que defienden los colores de Lemare FC en cada partido. Un equipo unido por la pasión y el compromiso.</p>
            </header>
            {(isLoading || originalPlayers.length === 0) && (
                <section className='playerList'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <PlayerCardSkeleton key={index} />
                    ))}
                </section>
            )}
            <section className='playerList'>
                {Object.entries(groupedPlayers).map(([position, players]) => (
                    <article key={position} className='playerGroup'>
                        <h2 className='positionHeader'>{`${position}/s`}</h2>
                        <div className='playerCards'>
                            {players.map(player => (
                                <PlayerCard key={player.id} player={player} />
                            ))}
                        </div>
                    </article>
                ))}
            </section>
        </section>
    );
};
