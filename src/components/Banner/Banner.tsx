import { NavLinks } from '../../types/navLinks'
import { CustomButton } from '../CustomButton/CustomButton'
import './_banner.scss'

export const Banner = () => {
    return (
        <div className='banner'>
            <img src="/escudoDelLemareFC.png" alt="Lemare FC" className="banner-logo" />
            <h1 className='title'>LEMARE FC</h1>
            <p>Pasión, tradición y excelencia en cada partido. Somos más que un equipo, somos una familia unida por el amor al fútbol.</p>
            <div className='banner-buttons'>
                {/* <CustomButton text="Próximos Partidos" typeOfButton={true} url={NavLinks.PARTIDOS.toLocaleLowerCase()} /> */}
                <CustomButton text="Conoce al equipo" typeOfButton={false} url={NavLinks.PLANTEL.toLocaleLowerCase()} />
            </div>
        </div>
    )
}
