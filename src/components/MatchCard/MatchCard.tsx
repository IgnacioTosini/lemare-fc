import { useRef } from 'react';
import { useGsapFadeInUp } from '../../hooks/useGsapFadeInUp';
import { CustomButton } from '../CustomButton/CustomButton'
import { FaRegCalendarAlt } from "react-icons/fa";
import { NavLinks } from '../../types/navLinks';
import './_matchCard.scss'

export const MatchCard = () => {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const footerRef = useRef<HTMLDivElement | null>(null);

    useGsapFadeInUp(cardRef, 0);
    useGsapFadeInUp(titleRef, 0.15);
    useGsapFadeInUp(contentRef, 0.3);
    useGsapFadeInUp(footerRef, 0.45);

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
