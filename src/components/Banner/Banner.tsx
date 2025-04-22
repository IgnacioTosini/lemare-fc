import './_banner.scss'

export const Banner = () => {
    return (
        <div className='banner'>
            <img src="/assets/escudoDelLemareFC.png" alt="Lemare FC" className="banner-logo" />
            <h1>Lemare FC</h1>
            <p>Pasión, tradición y excelencia en cada partido. Somos más que un equipo, somos una familia unida por el amor al fútbol.</p>
            <div className='banner-buttons'>
                <button className="banner-button">Próximos Partidos</button>
                <button className="banner-button">Conoce al equipo</button>
            </div>
        </div>
    )
}
