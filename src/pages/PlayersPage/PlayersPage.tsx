import { usePlayerContext } from '../../context/playerStore';
import { PlayerCard } from '../../components/PlayerCard/PlayerCard';
import { PlayerCardSkeleton } from '../../components/PlayerCardSkeleton/PlayerCardSkeleton';
import { Position } from '../../types/positions';
import './_playersPage.scss';

export const PlayersPage = () => {
    const { players: originalPlayers, isLoading } = usePlayerContext();

    // Agrupar jugadores por posición
    const groupedPlayers: Record<Position, typeof originalPlayers> = originalPlayers.reduce((acc, player) => {
        if (player.position && Object.values(Position).includes(player.position as Position)) {
            if (!acc[player.position as Position]) {
                acc[player.position as Position] = [];
            }
            acc[player.position as Position].push(player);
        }
        return acc;
    }, {} as Record<Position, typeof originalPlayers>);

    // Ordenar las posiciones según el orden definido en Position
    const orderedPositions = Object.values(Position);
    const sortedGroupedPlayers = orderedPositions
        .map(position => [position, groupedPlayers[position] || []])
        .filter(([, players]) => Array.isArray(players) && players.length > 0);

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
                {sortedGroupedPlayers.map(([position, players]) => (
                    <article key={String(position)} className='playerGroup'>
                        <h2 className='positionHeader'>{`${position}/s`}</h2>
                        <div className='playerCards'>
                            {(players as typeof originalPlayers).map(player => (
                                <PlayerCard key={player.id} player={player} />
                            ))}
                        </div>
                    </article>
                ))}
            </section>
        </section>
    );
};