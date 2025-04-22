import './_navbar.scss';

export const Navbar = () => {
    return (
        <div>
            <nav className="navbar">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a className="nav-link active" aria-current="page" href="/">Inicio</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/jugadores">Jugadores</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/multimedia">Multimedia</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link disabled">Contact</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
