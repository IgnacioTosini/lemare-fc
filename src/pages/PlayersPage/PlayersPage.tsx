import { usePlayerContext } from '../../context/playerStore';
import { PlayerCard } from '../../components/PlayerCard/PlayerCard';
import { PlayerCardSkeleton } from '../../components/PlayerCardSkeleton/PlayerCardSkeleton';
import { Position } from '../../types/positions';
import { useRef } from 'react';
import { useGsapFadeInUp } from '../../hooks/useGsapFadeInUp';
import { useGsapFadeInUpArray } from '../../hooks/useGsapFadeInUpArray';
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

    // Refs para animar el header
    const headerTitleRef = useRef<HTMLHeadingElement | null>(null);
    const headerDescRef = useRef<HTMLParagraphElement | null>(null);
    // Refs para los headers de cada grupo de posición
    const positionHeadersRef = useRef<(HTMLHeadingElement | null)[]>([]);
    // Ref para la lista de jugadores
    const playerListRef = useRef<HTMLElement | null>(null);

    useGsapFadeInUp(headerTitleRef, 0);
    useGsapFadeInUp(headerDescRef, 0.2);
    useGsapFadeInUp(playerListRef, 0.5);
    // Animar los headers de posición
    useGsapFadeInUpArray(
        positionHeadersRef.current.map(ref => ({ current: ref })),
        0.3, 0.15
    );

    console.log('Original Players:', originalPlayers);

    return (
        <section className='playersPage'>
            <header className='playersPageHeader'>
                <h1 ref={headerTitleRef}>Nuestros Jugadores</h1>
                <p ref={headerDescRef}>Conoce a los protagonistas que defienden los colores de Lemare FC en cada partido. Un equipo unido por la pasión y el compromiso.</p>
            </header>
            {(isLoading || originalPlayers.length === 0) && (
                <section className='playerList'>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <PlayerCardSkeleton key={index} />
                    ))}
                </section>
            )}
            <section className='playerList' ref={playerListRef}>
                {sortedGroupedPlayers.map(([position, players], i) => (
                    <article key={String(position)} className='playerGroup'>
                        <h2
                            className='positionHeader'
                            ref={el => {
                                positionHeadersRef.current[i] = el;
                            }}
                        >{`${position}/s`}</h2>
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