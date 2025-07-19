import { memo } from 'react';
import { Link, useLocation } from 'react-router';
import { Player } from '../../types';
import { MorePlayerInfo } from '../MorePlayerInfo/MorePlayerInfo';
import { CustomListSocialMedia } from '../CustomListSocialMedia/CustomListSocialMedia';
import { NavLinks } from '../../types/navLinks';
import { Position } from '../../types/positions';
import { useCloudinaryWebp } from '../../hooks/useCloudinaryWebp';
import './_playercard.scss';

type PlayerCardProps = {
    player: Player;
};

export const PlayerCard = memo(({ player }: PlayerCardProps) => {
    const location = useLocation();
    const getWebpUrl = useCloudinaryWebp();
    const showMorePlayerInfo = location.pathname.includes(`/${NavLinks.PLANTEL.toLocaleLowerCase()}/${player.id}`);

    const cardContent = (
        <>
            <div className='playerImageContainer'>
                <img src={getWebpUrl(player.image.url)} alt={player.name} className='playerImage' loading="lazy" width="300" height="300" />
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

    return (
        showMorePlayerInfo ? (
            <div className={`playerCard rainbow-shadow ${showMorePlayerInfo ? 'expanded individualCard' : 'playerCard'}`}>
                {cardContent}
            </div>
        ) : (
            <Link to={`/plantel/${player.id}`} className={`playerCard rainbow-shadow ${showMorePlayerInfo ? 'expanded' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                {cardContent}
            </Link>
        )
    );
});


