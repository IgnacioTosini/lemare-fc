import { useParams, useNavigate } from 'react-router';
import { PlayerCard } from '../../components/PlayerCard/PlayerCard';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { usePlayerContext } from '../../context/playerStore';
import { PlayerPageSkeleton } from '../../components/PlayerPageSkeleton/PlayerPageSkeleton';
import { useRef } from 'react';
import { useGsapFadeInUp } from '../../hooks/useGsapFadeInUp';
import './_playerPage.scss';

export const PlayerPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { players: originalPlayers } = usePlayerContext();
    const player = originalPlayers.find(p => p.id === Number(id));

    // Animaciones
    const navRef = useRef<HTMLElement | null>(null);
    const cardRef = useRef<HTMLElement | null>(null);
    const bioTitleRef = useRef<HTMLHeadingElement | null>(null);
    const bioDescRef = useRef<HTMLParagraphElement | null>(null);
    const statsTitleRef = useRef<HTMLHeadingElement | null>(null);
    const statsListRef = useRef<HTMLUListElement | null>(null);

    useGsapFadeInUp(navRef, 0);
    useGsapFadeInUp(cardRef, 0.15);
    useGsapFadeInUp(bioTitleRef, 0.3);
    useGsapFadeInUp(bioDescRef, 0.45);
    useGsapFadeInUp(statsTitleRef, 0.6);
    useGsapFadeInUp(statsListRef, 0.75);

    if (!player) {
        return (<PlayerPageSkeleton />);
    }

    return (
        <section className='playerPage'>
            <nav ref={navRef}>
                <button type="button" className='backArrow' onClick={() => navigate(-1)}>
                    <FaLongArrowAltLeft /><p>Volver a jugadores</p>
                </button>
            </nav>
            <article className="playerDetail">
                <section className='playerCardContainer' ref={cardRef}>
                    <PlayerCard player={player} />
                </section>
                <section className='playerInfo'>
                    <article className='playerDescription'>
                        <h1 className='description' ref={bioTitleRef}>Biografía</h1>
                        <p ref={bioDescRef}>{player.description}</p>
                    </article>
                    <article className='playerStats'>
                        <h1 className='description' ref={statsTitleRef}>Estadísticas de la temporada</h1>
                        <ul className='statsList' ref={statsListRef}>
                            <li className='statItem'><p className='statValue'>{player.stats?.goals}</p><p>Goles</p> </li>
                            <li className='statItem'><p className='statValue'>{player.stats?.assists}</p><p>Asistencias</p></li>
                            <li className='statItem'><p className='statValue'>{player.stats?.matches}</p><p>Partidos</p></li>
                            <li className='statItem'><p className='statValue'>{player.stats?.yellowCards}</p><p>Tarjetas amarillas</p></li>
                            <li className='statItem'><p className='statValue'>{player.stats?.redCards}</p><p>Tarjetas rojas</p></li>
                        </ul>
                    </article>
                </section>
            </article>
        </section>
    );
};