import { memo } from 'react';
import { CustomButton, CustomInfoCard } from '../';
import { NavLinks } from '../../types/navLinks';
import './_infoContainer.scss'

export const InfoContainer = memo(() => {
    return (
        <div className='infoContainer'>
            <h1>Explora al LEMARE FC</h1>
            <div className='infoContainerCards'>
                <CustomInfoCard
                    title="Jugadores"
                    image="player"
                    description="Conoce a los protagonistas que defienden nuestros colores en cada partido."
                    titleButton="Ver Jugadores"
                    url={`${NavLinks.PLANTEL.toLocaleLowerCase()}`}
                />
{/*                 <CustomInfoCard
                    title="Torneo"
                    image="cup"
                    description="Explora el torneo, conoce a los equipos rivales y sigue el camino hacia la gloria."
                    titleButton="Ver Torneo"
                    url={`${NavLinks.PARTIDOS.toLocaleLowerCase()}`}
                /> */}
                <CustomInfoCard
                    title="Multimedia"
                    image="multimedia"
                    description="Disfruta de los mejores momentos, entrevistas y contenido exclusivo del equipo."
                    titleButton="Ver Multimedia"
                    url={`${NavLinks.MULTIMEDIA.toLocaleLowerCase()}`}
                />
            </div>

            <div className='infoT-shirtContainer'>
                <h2>¡Viste la camiseta del LEMARE FC!</h2>
                <div className='infoT-shirt'>
                    <img src="/conjuntoLocalLemare.webp" alt="Uniforme local del Lemare FC" width="400" height="400" loading="lazy" />
                    <img src="/conjuntoVisitanteLemare.webp" alt="Uniforme visitante del Lemare FC" width="400" height="400" loading="lazy" />
                </div>
                <CustomButton
                    text="Visitar la tienda Drop"
                    typeOfButton={true}
                    url="https://www.instagram.com/drop.extra/"
                    blank={true}
                />
            </div>
        </div>
    )
});
