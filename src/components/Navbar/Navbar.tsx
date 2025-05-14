import { useState, memo } from 'react';
import { Link } from 'react-router';
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLinks } from '../../types/navLinks';
import { prefetchRoute } from '../../utils/prefetchRoute';
import './_navbar.scss';

export const Navbar = memo(() => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isDisabled = true;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className='navbar'>
            <button className="menuToggle" onClick={toggleMenu}>
                <GiHamburgerMenu className="hamburgerIcon" />
            </button>

            <ul className={`navbarNav ${isMenuOpen ? 'open' : ''}`}>
                <li className="navItem">
                    <Link className="navLink" aria-current="page" to="/"
                        onMouseEnter={() => prefetchRoute(() => import('../../pages/HomePage/HomePage'))}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >{NavLinks.INICIO}</Link>
                </li>
                <li className="navItem">
                    <Link className="navLink" to="/plantel"
                        onMouseEnter={() => prefetchRoute(() => import('../../pages/PlayersPage/PlayersPage'))}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >{NavLinks.PLANTEL}</Link>
                </li>
                <li className={`navItem ${isDisabled ? 'disabled' : ''}`}>
                    <Link className="navLink" to="/partidos"
                        onMouseEnter={() => prefetchRoute(() => import('../../pages/PartidosPage/PartidosPage'))}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >{NavLinks.PARTIDOS}</Link>
                </li>
                <li className="navItem">
                    <Link className="navLink" to="/multimedia"
                        onMouseEnter={() => prefetchRoute(() => import('../../pages/MultimediaPage/MultimediaPage'))}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >{NavLinks.MULTIMEDIA}</Link>
                </li>
                <li className="navItem">
                    <Link className="navLink" to="/quienes-somos"
                        onMouseEnter={() => prefetchRoute(() => import('../../pages/QuienesSomosPage/QuienesSomosPage'))}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >{NavLinks.QUIENES_SOMOS}</Link>
                </li>
            </ul>
        </nav>
    );
});
