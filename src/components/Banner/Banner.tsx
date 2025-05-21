import { memo, useRef } from 'react';
import { useGsapFadeInUp } from '../../hooks/useGsapFadeInUp';
import { NavLinks } from '../../types/navLinks'
import { CustomButton } from '../CustomButton/CustomButton'
import './_banner.scss'

export const Banner = memo(() => {
    const bannerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const buttonsRef = useRef<HTMLDivElement>(null);

    useGsapFadeInUp(bannerRef, 0);
    useGsapFadeInUp(logoRef, 0.2);
    useGsapFadeInUp(titleRef, 0.35);
    useGsapFadeInUp(descRef, 0.5);
    useGsapFadeInUp(buttonsRef, 0.65);

    return (
        <div className='banner' ref={bannerRef}>
            <img ref={logoRef} src="/escudoDelLemareFC.png" alt="Escudo del Lemare FC" className="banner-logo" width="300" height="300" loading="lazy" />
            <h1 className='title' ref={titleRef}>LEMARE FC</h1>
            <p ref={descRef}>Pasión, tradición y excelencia en cada partido. Somos más que un equipo, somos una familia unida por el amor al fútbol.</p>
            <div className='banner-buttons' ref={buttonsRef}>
                {/* <CustomButton text="Próximos Partidos" typeOfButton={true} url={NavLinks.PARTIDOS.toLocaleLowerCase()} /> */}
                <CustomButton text="Conoce al equipo" typeOfButton={false} url={NavLinks.PLANTEL.toLocaleLowerCase()} />
            </div>
        </div>
    )
});
