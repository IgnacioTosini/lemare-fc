import { useParams, useNavigate } from 'react-router';
import { PlayerCard } from '../../components/PlayerCard/PlayerCard';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { usePlayerContext } from '../../context/playerStore';
import { PlayerPageSkeleton } from '../../components/PlayerPageSkeleton/PlayerPageSkeleton';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
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

    useEffect(() => {
        if (navRef.current) {
            gsap.fromTo(navRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' });
        }
        if (cardRef.current) {
            gsap.fromTo(cardRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: 'power3.out' });
        }
        if (bioTitleRef.current) {
            gsap.fromTo(bioTitleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' });
        }
        if (bioDescRef.current) {
            gsap.fromTo(bioDescRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.45, ease: 'power3.out' });
        }
        if (statsTitleRef.current) {
            gsap.fromTo(statsTitleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.6, ease: 'power3.out' });
        }
        if (statsListRef.current) {
            gsap.fromTo(statsListRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.75, ease: 'power3.out' });
        }
    }, []);

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