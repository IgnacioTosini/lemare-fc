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
                />
                <CustomInfoCard
                    title="Estadísticas"
                    image="cup"
                    description="Explora las estadísticas detalladas de nuestro equipo y jugadores."
                    titleButton="Ver Estadísticas"
                />
                <CustomInfoCard
                    title="Multimedia"
                    image="multimedia"
                    description="Disfruta de los mejores momentos, entrevistas y contenido exclusivo del equipo."
                    titleButton="Ver Multimedia"
                />
            </div>
        </div>
    )
}
