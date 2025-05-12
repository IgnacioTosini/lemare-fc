import { Link, useLocation } from 'react-router';
import { memo } from 'react';
import { Player } from '../../types';
import { MorePlayerInfo } from '../MorePlayerInfo/MorePlayerInfo';
import { CustomListSocialMedia } from '../CustomListSocialMedia/CustomListSocialMedia';
import { NavLinks } from '../../types/navLinks';
import { Position } from '../../types/positions';
import './_playercard.scss';

type PlayerCardProps = {
    player: Player;
};

export const PlayerCard = memo(({ player }: PlayerCardProps) => {
    const location = useLocation();
    const showMorePlayerInfo = location.pathname.includes(`/${NavLinks.PLANTEL.toLocaleLowerCase()}/${player.id}`);

    const cardContent = (
        <>
            <div className='playerImageContainer'>
                <img src={player.image} alt={player.name} className='playerImage' loading="lazy" />
                {player.position !== Position.CUERPO_TECNICO && (
                    <div className='playerNumberContainer'>
                        <span className='playerNumber'>{player.number}</span>
                    </div>
                )}
            </div>
            <div className='playerInfo'>
                <h2>{player.name.toUpperCase()}</h2>
                <p>{player.position}</p>
            </div>
            {showMorePlayerInfo && (
                <section className='playerInfoExpanded'>
                    <MorePlayerInfo player={player} />
                    <CustomListSocialMedia socialMedia={player.socialMedia || []} />
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
            <div className={`playerCard ${showMorePlayerInfo ? 'expanded individualCard' : 'playerCard'}`}>
                {cardContent}
            </div>
        ) : (
            <Link to={`/plantel/${player.id}`} className={`playerCard ${showMorePlayerInfo ? 'expanded' : ''}`}>
                {cardContent}
            </Link>
        )
    );
});


