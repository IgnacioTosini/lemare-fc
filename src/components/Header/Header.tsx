import { useEffect, useState, memo } from 'react';
import { Link } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { Navbar, MenuHamburguesa } from '../index';
import { useThemeContext } from '../../context/themeContext';
import { FaSun, FaMoon } from "react-icons/fa";
import { prefetchRoute } from '../../utils/prefetchRoute';

import './_header.scss';

export const Header = memo(() => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
    const { theme, toggleTheme } = useThemeContext();

    useEffect(() => {
        const handleResize = () => {
            setIsTabletOrMobile(window.innerWidth <= 1024);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="header">
            <div className="headerLogo">
                <Link to="/" className="logoLink"
                    onMouseEnter={() => prefetchRoute(() => import('../../pages/HomePage/HomePage'))}
                >
                    <img src="/escudoDelLemareFC.png" alt="Escudo del Lemare FC" className="logo" loading="lazy" width="100" height="100" />
                    <h1 className="headerTitle">LEMARE FC</h1>
                </Link>
            </div>
            <div className="headerLinks">
                {isTabletOrMobile ? (
                    <>
                        <button
                            className="menuToggle"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                        >
                            {isMenuOpen ? <MdOutlineClose /> : <GiHamburgerMenu />}
                        </button>
                        <MenuHamburguesa isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                    </>
                ) : (
                    <Navbar />
                )}
                <button
                    className="themeToggle"
                    onClick={toggleTheme}
                    aria-label={theme === 'light' ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
                >
                    {theme === 'light' ? <FaMoon /> : <FaSun />}
                </button>
            </div>
        </div>
    );
});