import './_loader.scss';

export const Loader = () => (
    <div className="loader-wrapper" aria-label="Cargando">
        <div className="loader"></div>
        <span className="loader-text">Cargando...</span>
    </div>
);
