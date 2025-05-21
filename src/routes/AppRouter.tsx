import { Suspense, lazy, useRef } from "react";
import { JSX } from "react";
import { Route, Routes, Navigate } from "react-router";
import { NavLinks } from '../types/navLinks';
import { Loader } from "../components";
import { useGsapFadeInUp } from '../hooks/useGsapFadeInUp';

// Lazy load de las páginas principales (se requiere export default)
const HomePage = lazy(() => import('../pages/HomePage/HomePage').then(module => ({ default: module.HomePage })));
const PlayersPage = lazy(() => import('../pages/PlayersPage/PlayersPage').then(module => ({ default: module.PlayersPage })));
const PlayerPage = lazy(() => import('../pages/PlayerPage/[id]').then(module => ({ default: module.PlayerPage })));
const PartidosPage = lazy(() => import('../pages/PartidosPage/PartidosPage').then(module => ({ default: module.PartidosPage })));
const MultimediaPage = lazy(() => import('../pages/MultimediaPage/MultimediaPage').then(module => ({ default: module.MultimediaPage })));
const QuienesSomosPage = lazy(() => import('../pages/QuienesSomosPage/QuienesSomosPage').then(module => ({ default: module.QuienesSomosPage })));
const ABMPage = lazy(() => import('../pages/ABMPage/ABMPage').then(module => ({ default: module.ABMPage })));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage/NotFoundPage').then(module => ({ default: module.NotFoundPage })));

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
    const pageRef = useRef<HTMLDivElement | null>(null);

    useGsapFadeInUp(pageRef, 0);

    return (
        <Suspense fallback={<Loader />}>
            <div ref={pageRef}>
                <Routes>
                    {routes.map(({ path, element }) => (
                        path === '/admin' ? (
                            <Route key={path} path={path} element={<ProtectedRoute element={element} />} />
                        ) : (
                            <Route key={path} path={path} element={element} />
                        )
                    ))}
                </Routes>
            </div>
        </Suspense>
    );
};
