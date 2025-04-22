import { Route, Routes } from "react-router"
import { Home } from "../pages/Home/Home"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jugadores" element={<h1>Jugadores</h1>} />
            <Route path="/multimedia" element={<h1>Multimedia</h1>} />
            <Route path="/contact" element={<h1>Contact</h1>} />
        </Routes>
    )
}
