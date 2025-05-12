import { Link } from 'react-router'
import { Helmet } from 'react-helmet-async';
import './_notFoundPage.scss'

export const NotFoundPage = () => {
    return (
        <>
            <Helmet>
                <title>404 | Página no encontrada | Lemare FC</title>
                <meta name="description" content="La página que buscas no existe. Vuelve al inicio de Lemare FC." />
            </Helmet>
            <div className="notFoundPageWrapper">
                <h1 className="notFoundPageTitle">404</h1>
                <h2 className="notFoundPageSubtitle">Página no encontrada</h2>
                <p className="notFoundPageText">Lo sentimos, la página que estás buscando no existe.</p>
                <Link to="/" className="notFoundPageLink">Volver a la página principal</Link>
                <img src="/escudoDelLemareFC.png" alt="Escudo del Lemare FC" className="notFoundPageLogo" loading="lazy" />
                <p className="notFoundPageText">Desarrollado por Ignacio Tosini</p>
            </div>
        </>
    )
}
