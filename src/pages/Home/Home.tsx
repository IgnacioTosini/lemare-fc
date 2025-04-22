import { Banner } from "../../components/Banner/Banner"
import { Header } from "../../components/Header/Header"
import './_home.scss'

export const Home = () => {
    return (
        <div className="home">
            <Header />
            <Banner />
        </div>
    )
}
