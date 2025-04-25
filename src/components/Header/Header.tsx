import { Link } from "react-router"
import { Navbar } from "../Navbar/Navbar"
import './_header.scss'

export const Header = () => {
    return (
        <div className="header">
            <div className="headerLogo">
                <Link to="/" className="logoLink">
                    <img src="/escudoDelLemareFC.png" alt="Lemare Fc" className="logo" />
                    <h1 className="headerTitle">LEMARE FC</h1>
                </Link>
            </div>
            <Navbar />
        </div>
    )
}