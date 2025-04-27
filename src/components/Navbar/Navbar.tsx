import { useState } from 'react';
import { Link } from 'react-router';
import { GiHamburgerMenu } from "react-icons/gi";
import './_navbar.scss';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const isDisabled = true;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <button className="menuToggle" onClick={toggleMenu}>
                <GiHamburgerMenu className="hamburgerIcon" />
            </button>
            <ul className={`navbarNav ${isMenuOpen ? 'open' : ''}`}>
                <li className="navItem">
                    <Link className="navLink" aria-current="page" to="/">Inicio</Link>
                </li>
                <li className="navItem">
                    <Link className="navLink" to="/jugadores">Jugadores</Link>
                </li>
                <li className={`navItem ${isDisabled ? 'disabled' : ''}`}>

                    <Link className="navLink" to="/partidos">Partidos</Link>
                </li>
                <li className="navItem">
                    <Link className="navLink" to="/multimedia">Multimedia</Link>
                </li>
                <li className="navItem">
                    <Link className="navLink" to="/contacto">Contacto</Link>
                </li>
            </ul>
        </nav>
    );
}
