import { Link } from 'react-router';
import { navLinks } from '../../types/navLinks';
import './_menuHamburguesa.scss';

type MenuHamburguesaProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const MenuHamburguesa = ({isOpen, onClose }: MenuHamburguesaProps) => {
    return (
        <div className={`menuHamburguesa ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <ul className="menuHamburguesaList">
                {navLinks.map((link, index) => (
                    <li key={index} className="menuHamburguesaItem">
                        <Link to={link.to.toLowerCase()} className="menuHamburguesaLink">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};