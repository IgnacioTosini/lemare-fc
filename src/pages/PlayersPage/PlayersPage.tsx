import { usePlayerContext } from '../../context/playerStore';
import { PlayerCard } from '../../components/PlayerCard/PlayerCard';
import { PlayerCardSkeleton } from '../../components/PlayerCardSkeleton/PlayerCardSkeleton';
import { Position } from '../../types/positions';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
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

    useEffect(() => {
        if (headerTitleRef.current && headerDescRef.current) {
            gsap.fromTo(
                headerTitleRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }
            );
            gsap.fromTo(
                headerDescRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power3.out' }
            );
        }
        // Animar los headers de posición
        if (positionHeadersRef.current.length > 0) {
            positionHeadersRef.current.forEach((header, i) => {
                if (!header) return;
                gsap.fromTo(
                    header,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.6, delay: 0.3 + i * 0.15, ease: 'power3.out' }
                );
            });
        }
        // Animar la lista de jugadores
        if (playerListRef.current) {
            gsap.fromTo(
                playerListRef.current,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, duration: 0.7, delay: 0.5, ease: 'power3.out' }
            );
        }
    }, [sortedGroupedPlayers]);

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