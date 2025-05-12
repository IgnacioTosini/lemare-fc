import { Helmet } from 'react-helmet-async';

export const Patrocinadores = () => {
    return (
        <>
            <Helmet>
                <title>Patrocinadores | Lemare FC</title>
                <meta name="description" content="Conoce a los patrocinadores oficiales de Lemare FC." />
            </Helmet>
            <section className='patrocinadoresPage'>
                <h1>Patrocinadores</h1>
                <p>Conoce a las empresas y organizaciones que apoyan a Lemare FC.</p>
            </section>
        </>
    );
}
