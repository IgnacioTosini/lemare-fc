import { Link, useLocation } from 'react-router';
import { Player } from '../../types';
import { MorePlayerInfo } from '../MorePlayerInfo/MorePlayerInfo';
import { CustomListSocialMedia } from '../CustomListSocialMedia/CustomListSocialMedia';
import { NavLinks } from '../../types/navLinks';
import './_playercard.scss';
import { Position } from '../../types/positions';

type PlayerCardProps = {
    player: Player;
};

export const PlayerCard = ({ player }: PlayerCardProps) => {
    const location = useLocation();
    const showMorePlayerInfo = location.pathname.includes(`/${NavLinks.PLANTEL.toLocaleLowerCase()}/${player.id}`);

    const cardContent = (
        <>
            <div className='playerImageContainer'>
                <img src={player.image} alt={player.name} className='playerImage' />
                {player.position !== Position.CUERPO_TECNICO && (
                    <div className='playerNumber'>
                        {player.number}
                    </div>
                )}
            </div>
            <div className='playerInfo'>
                <h2>{player.name}</h2>
                <p>{player.position}</p>
            </div>
            {showMorePlayerInfo && (
                <section className='playerInfoExpanded'>
                    <MorePlayerInfo player={player} />
                    <CustomListSocialMedia socialMedia={player.socialMedia} />
                </section>
            )}
        </>
    );

    if (player.position === Position.CUERPO_TECNICO) {
        return (
            <div className={`playerCard ${showMorePlayerInfo ? 'expanded' : ''}`}>
                {cardContent}
            </div>
        );
    }

    return (
        showMorePlayerInfo ? (
            <div className={`playerCard ${showMorePlayerInfo ? 'expanded' : ''}`}>
                {cardContent}
            </div>
        ) : (
            <Link to={`/plantel/${player.id}`} className={`playerCard ${showMorePlayerInfo ? 'expanded' : ''}`}>
                {cardContent}
            </Link>
        )
    );
};
