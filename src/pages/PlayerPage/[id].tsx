import { Link, useParams } from 'react-router';
import { PlayerCard } from '../../components/PlayerCard/PlayerCard';
import { FaLongArrowAltLeft } from "react-icons/fa";
import { usePlayerContext } from '../../context/playerStore';
import { PlayerPageSkeleton } from '../../components/PlayerPageSkeleton/PlayerPageSkeleton';
import { Helmet } from 'react-helmet-async';
import './_playerPage.scss';

export const PlayerPage = () => {
    const { id } = useParams<{ id: string }>();
    const { players: originalPlayers } = usePlayerContext();
    const player = originalPlayers.find(p => p.id === Number(id));

    if (!player) {
        return (<PlayerPageSkeleton />);
    }

    return (
        <>
            <Helmet>
                <title>{player.name} | Lemare FC</title>
                <meta name="description" content={`Perfil, biografía y estadísticas de ${player.name} en Lemare FC.`} />
            </Helmet>
            <section className='playerPage'>
                <nav>
                    <Link to={`/plantel`} className='backArrow'><FaLongArrowAltLeft /> <p>Volver a jugadores</p></Link>
                </nav>
                <article className="playerDetail">
                    <section className='playerCardContainer'>
                        <PlayerCard player={player} />
                    </section>
                    <section className='playerInfo'>
                        <article className='playerDescription'>
                            <h1 className='description'>Biografía</h1>
                            <p>{player.description}</p>
                        </article>
                        <article className='playerStats'>
                            <h1 className='description'>Estadísticas de la temporada</h1>
                            <ul className='statsList'>
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
        </>
    );
};