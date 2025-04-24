import { useState } from 'react';
import { Link } from 'react-router';
import { GiHamburgerMenu } from "react-icons/gi";
import './_navbar.scss';

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <button className="menu-toggle" onClick={toggleMenu}>
                <GiHamburgerMenu className="hamburger-icon" />
            </button>
            <ul className={`navbar-nav ${isMenuOpen ? 'open' : ''}`}>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Inicio</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/jugadores">Jugadores</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/partidos">Partidos</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/multimedia">Multimedia</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link disabled" to="/contacto">Contacto</Link>
                </li>
            </ul>
        </nav>
    );
}
