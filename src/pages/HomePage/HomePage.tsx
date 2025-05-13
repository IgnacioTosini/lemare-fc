import { useEffect, useState } from 'react';
import { Banner, InfoContainer, MatchCard, Loader } from '../../components';
import './_homePage.scss'

export const HomePage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simula una carga inicial (puedes reemplazarlo por tu lógica real)
        const timer = setTimeout(() => setLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <Loader />;

    return (
        <div className="home">
            <Banner />
            <MatchCard />
            <InfoContainer />
        </div>
    )
}
