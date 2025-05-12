import { Link } from 'react-router';
import { memo } from 'react';
import { navLinks } from '../../types/navLinks';
import { prefetchRoute } from '../../utils/prefetchRoute';
import './_menuHamburguesa.scss';

type MenuHamburguesaProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const MenuHamburguesa = memo(({isOpen, onClose }: MenuHamburguesaProps) => {
    return (
        <div className={`menuHamburguesa ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <ul className="menuHamburguesaList">
                {navLinks.map((link, index) => (
                    <li key={index} className="menuHamburguesaItem">
                        <Link
                            to={link.to.toLowerCase()}
                            className="menuHamburguesaLink"
                            onMouseEnter={() => {
                                switch (link.to.toLowerCase()) {
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
    );
});