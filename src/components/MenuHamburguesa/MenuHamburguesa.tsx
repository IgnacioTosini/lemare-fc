import { Link } from 'react-router';
import './_menuHamburguesa.scss';

type MenuHamburguesaProps = {
    links: { label: string; to: string }[];
    isOpen: boolean;
    onClose: () => void;
};

export const MenuHamburguesa = ({ links, isOpen, onClose }: MenuHamburguesaProps) => {
    return (
        <div className={`menuHamburguesa ${isOpen ? 'open' : ''}`} onClick={onClose}>
            <ul className="menuHamburguesaList">
                {links.map((link, index) => (
                    <li key={index} className="menuHamburguesaItem">
                        <Link to={link.to} className="menuHamburguesaLink">
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};