import { Route, Routes } from "react-router";
import { HomePage, MultimediaPage, PartidosPage, PlayerPage, PlayersPage, QuienesSomosPage } from "../pages";
import { NavLinks } from '../types/navLinks';

const routes = [
    { path: '/', element: <HomePage />, name: NavLinks.INICIO },
    { path: '/plantel', element: <PlayersPage />, name: NavLinks.PLANTEL },
    { path: '/plantel/:id', element: <PlayerPage />, name: `${NavLinks.PLANTEL}/:id` },
    { path: '/partidos', element: <PartidosPage />, name: NavLinks.PARTIDOS },
    { path: '/multimedia', element: <MultimediaPage />, name: NavLinks.MULTIMEDIA },
    { path: '/quienes-somos', element: <QuienesSomosPage />, name: NavLinks.QUIENES_SOMOS },
];

export const AppRouter = () => {
    return (
        <Routes>
            {routes.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
            ))}
        </Routes>
    );
};
