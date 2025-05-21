import { memo, useRef, useEffect } from 'react';
import { CustomButton, CustomInfoCard } from '../';
import { NavLinks } from '../../types/navLinks';
import gsap from 'gsap';
import './_infoContainer.scss'

export const InfoContainer = memo(() => {
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const cardsRef = useRef<HTMLDivElement | null>(null);
    const tshirtTitleRef = useRef<HTMLHeadingElement | null>(null);
    const tshirtImgsRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (titleRef.current) {
            gsap.fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
        }
        if (cardsRef.current) {
            gsap.fromTo(cardsRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power3.out' });
        }
        if (tshirtTitleRef.current) {
            gsap.fromTo(tshirtTitleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.4, ease: 'power3.out' });
        }
        if (tshirtImgsRef.current) {
            gsap.fromTo(tshirtImgsRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.6, ease: 'power3.out' });
        }
        if (buttonRef.current) {
            gsap.fromTo(buttonRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.8, ease: 'power3.out' });
        }
    }, []);

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
