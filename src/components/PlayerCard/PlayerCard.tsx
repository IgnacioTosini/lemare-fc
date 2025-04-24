import { Link, useLocation } from 'react-router';
import { Player } from '../../types/player';
import { MorePlayerInfo } from '../MorePlayerInfo/MorePlayerInfo';
import { CustomListSocialMedia } from '../CustomListSocialMedia/CustomListSocialMedia';
import './_playercard.scss';

type PlayerCardProps = {
    player: Player;
};

export const PlayerCard = ({ player }: PlayerCardProps) => {
    const location = useLocation();
    const showMorePlayerInfo = location.pathname.includes(`/jugadores/${player.id}`);

    return (
        <Link to={`/jugadores/${player.id}`} className={`playerCard ${showMorePlayerInfo ? 'expanded' : ''}`}>
            <div className='playerImageContainer'>
                <img src={player.image} alt={player.name} className='playerImage' />
                <div className='playerNumber'>
                    {player.number}
                </div>
            </div>
            <div className='playerInfo'>
                <h2>{player.name}</h2>
                <p>{player.position}</p>
            </div>
            {showMorePlayerInfo &&
                (
                    <section className='playerInfoExpanded'>
                        <MorePlayerInfo player={player} />
                        <CustomListSocialMedia socialMedia={player.socialMedia} />
                    </section>
                )
            }
        </Link>
    );
};
