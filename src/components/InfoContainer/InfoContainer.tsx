import { CustomInfoCard } from '../CustomInfoCard/CustomInfoCard'
import './_infoContainer.scss'

export const InfoContainer = () => {
    return (
        <div className='infoContainer'>
            <h1>Explora al LEMARE FC</h1>
            <div className='infoContainerCards'>
                <CustomInfoCard
                    title="Jugadores"
                    image="player"
                    description="Conoce a los protagonistas que defienden nuestros colores en cada partido."
                    titleButton="Ver Jugadores"
                    url="/jugadores"
                />
                <CustomInfoCard
                    title="Torneo"
                    image="cup"
                    description="Explora el torneo, conoce a los equipos rivales y sigue el camino hacia la gloria."
                    titleButton="Ver Torneo"
                    url="/partidos"

                />
                <CustomInfoCard
                    title="Multimedia"
                    image="multimedia"
                    description="Disfruta de los mejores momentos, entrevistas y contenido exclusivo del equipo."
                    titleButton="Ver Multimedia"
                    url="/multimedia"
                />
            </div>
        </div>
    )
}
