import { useRef, useEffect } from 'react';
import './_matchCard.scss'
import gsap from 'gsap';
import { CustomButton } from '../CustomButton/CustomButton'
import { FaRegCalendarAlt } from "react-icons/fa";
import { NavLinks } from '../../types/navLinks';

export const MatchCard = () => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const footerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (cardRef.current) {
            gsap.fromTo(cardRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
        }
        if (titleRef.current) {
            gsap.fromTo(titleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.15, ease: 'power3.out' });
        }
        if (contentRef.current) {
            gsap.fromTo(contentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.3, ease: 'power3.out' });
        }
        if (footerRef.current) {
            gsap.fromTo(footerRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.45, ease: 'power3.out' });
        }
    }, []);

    return (
        <div className="matchCard" ref={cardRef}>
            <div className="matchCardHeader">
                <h2 className="matchCardTitle" ref={titleRef}>Próximo Partido</h2>
                <div className="matchCardContent" ref={contentRef}>
                    <div className='matchCardCalendar'>
                        <FaRegCalendarAlt className='calendarIcon' />
                        <p className="matchCardDate">Fecha: 2023-10-01</p>
                        <p className="matchCardTime">Horario: 18:00</p>
                    </div>
                    <p className="matchCardTeams">Lemare FC vs Team Balanza</p>
                </div>
            </div>
            <div className="matchCardFooter disabled" ref={footerRef}>
                <CustomButton text='Ver Todos los Partidos' typeOfButton={false} url={NavLinks.PARTIDOS.toLocaleLowerCase()} />
            </div>
        </div>
    )
}
