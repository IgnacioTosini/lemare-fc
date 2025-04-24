import { Banner } from "../../components/Banner/Banner"
import { InfoContainer } from "../../components/InfoContainer/InfoContainer"
import { MatchCard } from "../../components/MatchCard/MatchCard"
import './_home.scss'

export const Home = () => {
    return (
        <div className="home">
            <Banner />
            <MatchCard />
            <InfoContainer />
        </div>
    )
}
