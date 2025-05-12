import { Banner, InfoContainer, MatchCard } from '../../components';
import { Helmet } from 'react-helmet-async';
import './_homePage.scss'

export const HomePage = () => {
    return (
        <>
            <Helmet>
                <title>Inicio | Lemare FC</title>
                <meta name="description" content="Bienvenido a la página principal de Lemare FC. Noticias, partidos y toda la información del club." />
            </Helmet>
            <div className="home">
                <Banner />
                <MatchCard />
                <InfoContainer />
            </div>
        </>
    )
}
