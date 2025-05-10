import { useState } from 'react';
import { Link } from 'react-router';
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLinks } from '../../types/navLinks';
import './_navbar.scss';

export const Navbar = () => {
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
                    <Link className="navLink" aria-current="page" to="/">{NavLinks.INICIO}</Link>
                </li>
                <li className="navItem">
                    <Link className="navLink" to="/plantel">{NavLinks.PLANTEL}</Link>
                </li>
                <li className={`navItem ${isDisabled ? 'disabled' : ''}`}>
                    <Link className="navLink" to="/partidos">{NavLinks.PARTIDOS}</Link>
                </li>
                <li className="navItem">
                    <Link className="navLink" to="/multimedia">{NavLinks.MULTIMEDIA}</Link>
                </li>
                <li className="navItem">
                    <Link className="navLink" to="/quienes-somos">{NavLinks.QUIENES_SOMOS}</Link>
                </li>
            </ul>
        </nav>
    );
};
