import { memo, useRef } from 'react';
import { CustomButton, CustomInfoCard } from '../';
import { NavLinks } from '../../types/navLinks';
import { useGsapFadeInUp } from '../../hooks/useGsapFadeInUp';
import './_infoContainer.scss'

export const InfoContainer = memo(() => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const cardsRef = useRef<HTMLDivElement | null>(null);
    const tshirtTitleRef = useRef<HTMLHeadingElement | null>(null);
    const tshirtImgsRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);

    useGsapFadeInUp(titleRef, 0);
    useGsapFadeInUp(cardsRef, 0.2);
    useGsapFadeInUp(tshirtTitleRef, 0.4);
    useGsapFadeInUp(tshirtImgsRef, 0.6);
    useGsapFadeInUp(buttonRef, 0.8);

    return (
        <div className='infoContainer'>
            <h1 ref={titleRef}>Explora al LEMARE FC</h1>
            <div className='infoContainerCards' ref={cardsRef}>
                <CustomInfoCard
                    title="Jugadores"
                    image="player"
                    description="Conoce a los protagonistas que defienden nuestros colores en cada partido."
                    titleButton="Ver Jugadores"
                    url={`${NavLinks.PLANTEL.toLocaleLowerCase()}`}
                />
                <CustomInfoCard
                    title="Multimedia"
                    image="multimedia"
                    description="Disfruta de los mejores momentos, entrevistas y contenido exclusivo del equipo."
                    titleButton="Ver Multimedia"
                    url={`${NavLinks.MULTIMEDIA.toLocaleLowerCase()}`}
                />
            </div>
            <div className='infoT-shirtContainer'>
                <h2 ref={tshirtTitleRef}>¡Viste la camiseta del LEMARE FC!</h2>
                <div className='infoT-shirt' ref={tshirtImgsRef}>
                    <img src="/conjuntoLocalLemare.webp" alt="Uniforme local del Lemare FC" width="400" height="400" loading="lazy" />
                    <img src="/conjuntoVisitanteLemare.webp" alt="Uniforme visitante del Lemare FC" width="400" height="400" loading="lazy" />
                </div>
                <div ref={buttonRef}>
                    <CustomButton
                        text="Visitar la tienda Drop"
                        typeOfButton={true}
                        url="https://www.instagram.com/drop.extra/"
                        blank={true}
                    />
                </div>
            </div>
        </div>
    )
});
