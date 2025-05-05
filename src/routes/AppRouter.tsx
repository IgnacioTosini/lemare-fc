import { JSX } from "react";
import { Route, Routes, Navigate } from "react-router";
import { HomePage, MultimediaPage, PartidosPage, PlayerPage, PlayersPage, QuienesSomosPage } from "../pages";
import { NavLinks } from '../types/navLinks';
import { ABMPage } from "../pages/ABMPage/ABMPage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

const routes = [
    { path: '/', element: <HomePage />, name: NavLinks.INICIO },
    { path: '/plantel', element: <PlayersPage />, name: NavLinks.PLANTEL },
    { path: '/plantel/:id', element: <PlayerPage />, name: `${NavLinks.PLANTEL}/:id` },
    { path: '/partidos', element: <PartidosPage />, name: NavLinks.PARTIDOS },
    { path: '/multimedia', element: <MultimediaPage />, name: NavLinks.MULTIMEDIA },
    { path: '/quienes-somos', element: <QuienesSomosPage />, name: NavLinks.QUIENES_SOMOS },
    { path: '/admin', element: <ABMPage />, name: 'admin' },
    { path: '*', element: <NotFoundPage />, name: '404' },
];

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
    const secretKey = import.meta.env.VITE_ADMIN_SECRET_KEY;
    const userKey = new URLSearchParams(window.location.search).get('key');

    if (userKey !== secretKey) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export const AppRouter = () => {
    return (
        <Routes>
            {routes.map(({ path, element }) => (
                path === '/admin' ? (
                    <Route key={path} path={path} element={<ProtectedRoute element={element} />} />
                ) : (
                    <Route key={path} path={path} element={element} />
                )
            ))}
        </Routes>
    );
};
