import { Route, Routes } from "react-router"
import { HomePage, MultimediaPage, PartidosPage, PlayerPage, PlayersPage, QuienesSomosPage } from "../pages"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jugadores" element={<PlayersPage />} />
            <Route path="/jugadores/:id" element={<PlayerPage />} />
            <Route path="/partidos" element={<PartidosPage />} />
            <Route path="/multimedia" element={<MultimediaPage />} />
            <Route path="/contacto" element={<QuienesSomosPage />} />
        </Routes>
    )
}
