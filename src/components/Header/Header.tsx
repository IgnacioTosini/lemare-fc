import { useEffect, useState } from 'react';
import { Link } from "react-router";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import { Navbar, MenuHamburguesa } from '../index';
import { NavLinks } from '../../types/navLinks';

import './_header.scss';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);

    const links = [
        { label: 'Inicio', to: NavLinks.INICIO },
        { label: 'Plantel', to: NavLinks.PLANTEL },
        { label: 'Partidos', to: NavLinks.PARTIDOS },
        { label: 'Multimedia', to: NavLinks.MULTIMEDIA },
        { label: 'Quienes Somos', to: NavLinks.QUIENES_SOMOS },
    ];

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
                <Link to="/" className="logoLink">
                    <img src="/escudoDelLemareFC.png" alt="Lemare Fc" className="logo" />
                    <h1 className="headerTitle">LEMARE FC</h1>
                </Link>
            </div>
            {isTabletOrMobile ? (
                <>
                    <button className="menuToggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <MdOutlineClose /> : <GiHamburgerMenu />}
                    </button>
                    <MenuHamburguesa links={links} isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
                </>
            ) : (
                <Navbar />
            )}
        </div>
    );
};