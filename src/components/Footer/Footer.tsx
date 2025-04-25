import { Link } from 'react-router'
import { CustomListSocialMedia } from '../CustomListSocialMedia/CustomListSocialMedia'
import './_footer.scss'

const socialMedia = [
    {
        typeOfSocialMedia: 'instagram',
        url: 'https://www.instagram.com/lemarefc/'
    },
    {
        typeOfSocialMedia: 'youtube',
        url: ['https://www.youtube.com/@santiagotosini', 'https://www.youtube.com/@lucaanivio']
    },
    {
        typeOfSocialMedia: 'tiktok',
        url: 'https://www.tiktok.com/@lucaysanti_'
    }
]

export const Footer = () => {
    return (
        <div className='containerFooter'>
            <div className='footer'>
                <div className='teamInfo'>
                    <h1>LEMARE FC</h1>
                    <p>Equipo de fútbol comprometido con la excelencia deportiva y los valores del deporte.</p>
                </div>
                <div className='quickLinks'>
                    <p>Enlaces rápidos</p>
                    <ul className='links'>
                        <li><Link to="/jugadores" className='link'>Jugadores</Link></li>
                        <li><Link to="/partidos" className='link'>Partidos</Link></li>
                        <li><Link to="/multimedia" className='link'>Multimedia</Link></li>
                        <li><Link to="/contacto" className='link'>Contacto</Link></li>
                    </ul>
                </div>
                <ul className='socialIcons'>
                    <CustomListSocialMedia socialMedia={socialMedia} />
                </ul>
            </div>
            <p className='copyRight'>© {new Date().getFullYear()} Lemare FC. Todos los derechos reservados. Creado por Ignacio Tosini</p>
        </div>
    )
}
