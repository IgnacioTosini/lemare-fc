import { memo, useState } from 'react';
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

    const [mainImage, setmainImage] = useState(player.images[0]);

    const handleChangeMainImage = (index: number) => {
        setmainImage(player.images[index])
    }

    const cardContent = (
        <>
            <div className="playerImageContainer">
                {player.images && player.images.length > 0 ? (
                    <div className='galleryImage'>
                        <img
                            key={mainImage.id}
                            src={getWebpUrl(mainImage) || '../siluetaJugador.jpg'}
                            alt={`${player.name} ${mainImage.id + 1}`}
                            className="playerImage"
                            loading="lazy"
                            width="300"
                            height="300"
                        />

                    </div>
                ) : (
                    <img className="noImage" src={'../siluetaJugador.jpg'} alt="Sin imagen" />
                )}

                {player.position !== Position.CUERPO_TECNICO && (
                    <div className="playerNumberContainer">
                        <span className="playerNumber">{player.number}</span>
                    </div>
                )}
            </div>
            {showMorePlayerInfo && (
                <ul className='otherImages'>
                    {player.images.map((image, index) => (
                        <li key={index} className='secondaryImage' onClick={() => handleChangeMainImage(index)}>
                            <img src={image.url} alt={image.publicId} />
                        </li>
                    ))}
                </ul>
            )}

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


