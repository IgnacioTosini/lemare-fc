import { Route, Routes } from "react-router"
import { Home } from "../pages/Home/Home"
import { PlayersPage } from "../pages/PlayersPage/PlayersPage"
import { PlayerPage } from "../pages/PlayerPage/[id]";

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jugadores" element={<PlayersPage />} />
            <Route path="/jugadores/:id" element={<PlayerPage />} />
            <Route path="/partidos" element={<h1>Partidos</h1>} />
            <Route path="/multimedia" element={<h1>Multimedia</h1>} />
            <Route path="/contact" element={<h1>Contact</h1>} />
        </Routes>
    )
}
