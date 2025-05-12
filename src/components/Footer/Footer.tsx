import { Link } from 'react-router';
import { memo } from 'react';
import { CustomListSocialMedia } from '../';
import { navLinks } from '../../types/navLinks';
import { SocialMedia } from '../../types';
import { SocialMediaType } from '../../types/socialMedia';
import { prefetchRoute } from '../../utils/prefetchRoute';
import './_footer.scss'

const socialMedia: SocialMedia[] = [
    {
        typeOfSocialMedia: SocialMediaType.INSTAGRAM,
        url: 'https://www.instagram.com/lemarefc/'
    },
    {
        typeOfSocialMedia: SocialMediaType.YOUTUBE,
        url: ['https://www.youtube.com/@santiagotosini', 'https://www.youtube.com/@lucaanivio']
    },
    {
        typeOfSocialMedia: SocialMediaType.TIKTOK,
        url: 'https://www.tiktok.com/@lucaysanti_'
    }
];

export const Footer = memo(() => {
    return (
        <div className='containerFooter'>
            <div className='footer'>
                <div className='teamInfo'>
                    <h1>LEMARE FC</h1>
                    <p>Equipo de fútbol comprometido con la excelencia deportiva y los valores del deporte.</p>
                </div>
                <div className='quickLinks'>
                    <p>Enlaces rápidos</p>
                    <ul className='links'>
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <Link
                                    to={link.to}
                                    className='link'
                                    onMouseEnter={() => {
                                        switch (link.to) {
                                            case '/':
                                                prefetchRoute(() => import('../../pages/HomePage/HomePage'));
                                                break;
                                            case '/plantel':
                                                prefetchRoute(() => import('../../pages/PlayersPage/PlayersPage'));
                                                break;
                                            case '/partidos':
                                                prefetchRoute(() => import('../../pages/PartidosPage/PartidosPage'));
                                                break;
                                            case '/multimedia':
                                                prefetchRoute(() => import('../../pages/MultimediaPage/MultimediaPage'));
                                                break;
                                            case '/quienes-somos':
                                                prefetchRoute(() => import('../../pages/QuienesSomosPage/QuienesSomosPage'));
                                                break;
                                            default:
                                                break;
                                        }
                                    }}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <ul className='socialIcons'>
                    {socialMedia.map((media, index) => (
                        <li key={index}>
                            <CustomListSocialMedia socialMedia={[media]} />
                        </li>
                    ))}
                </ul>
            </div>
            <p className='copyRight'>© {new Date().getFullYear()} Lemare FC. Todos los derechos reservados. <span className='creatorHighlight'>Creado por Ignacio Tosini</span></p>
        </div>
    );
});
