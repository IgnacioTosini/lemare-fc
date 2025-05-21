import { Banner, InfoContainer, MatchCard } from '../../components';
import './_homePage.scss'

export const HomePage = () => {
    return (
        <div className="home">
            <Banner />
            <MatchCard />
            <InfoContainer />
        </div>
    )
}
