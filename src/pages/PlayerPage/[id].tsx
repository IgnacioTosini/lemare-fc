import { Link, useParams } from 'react-router';
import { PlayerCard } from '../../components/PlayerCard/PlayerCard';
import { players } from '../../utils/players';
import { FaLongArrowAltLeft } from "react-icons/fa";
import './_playerPage.scss';

export const PlayerPage = () => {
    const { id } = useParams<{ id: string }>();
    const player = players.find(p => p.id === Number(id));

    if (!player) {
        return <h1>Jugador no encontrado</h1>;
    }

    return (
        <section className='playerPage'>
            <Link to={`/plantel`} className='backArrow'><FaLongArrowAltLeft /> <p>Volver a jugadores</p></Link>
        <div className="playerDetail">
            <div className='playerCardContainer'>
                <PlayerCard player={player} />
            </div>
            <section className='playerInfo'>
                <section className='playerDescription'>
                    <h1 className='description'>Biografía</h1>
                    <p>{player.description}</p>
                </section>
                <section className='playerStats'>
                    <h1 className='description'>Estadísticas de la temporada</h1>
                    <ul className='statsList'>
                        <li className='statItem'><p className='statValue'>{player.stats?.goals}</p><p>Goles</p> </li>
                        <li className='statItem'><p className='statValue'>{player.stats?.assists}</p><p>Asistencias</p></li>
                        <li className='statItem'><p className='statValue'>{player.stats?.matches}</p><p>Partidos</p></li>
                        <li className='statItem'><p className='statValue'>{player.stats?.yellowCards}</p><p>Tarjetas amarillas</p></li>
                        <li className='statItem'><p className='statValue'>{player.stats?.redCards}</p><p>Tarjetas rojas</p></li>
                    </ul>
                </section>
            </section>
        </div>
        </section>
    );
};