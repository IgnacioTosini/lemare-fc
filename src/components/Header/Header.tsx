import { Navbar } from "../Navbar/Navbar"
import './_header.scss'

export const Header = () => {
    return (
        <div className="header">
            <div className="header-logo">
                <img src="/assets/escudoDelLemareFC.png" alt="Lemare Fc" className="logo" />
                <h1 className="header-title">Lemare FC</h1>
            </div>
            <Navbar />
        </div>
    )
}