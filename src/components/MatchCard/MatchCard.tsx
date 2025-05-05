import { CustomButton } from '../CustomButton/CustomButton'
import { FaRegCalendarAlt } from "react-icons/fa";
import { NavLinks } from '../../types/navLinks';
import './_matchCard.scss'

export const MatchCard = () => {
    return (
        <div className="matchCard">
            <div className="matchCardHeader">
                <h2 className="matchCardTitle">Próximo Partido</h2>
                <div className="matchCardContent">
                    <div className='matchCardCalendar'>
                        <FaRegCalendarAlt className='calendarIcon' />
                        <p className="matchCardDate">Fecha: 2023-10-01</p>
                        <p className="matchCardTime">Horario: 18:00</p>
                    </div>
                    <p className="matchCardTeams">Lemare FC vs Team Balanza</p>
                </div>
            </div>
            <div className="matchCardFooter disabled">
                <CustomButton text='Ver Todos los Partidos' typeOfButton={false} url={NavLinks.PARTIDOS.toLocaleLowerCase()} />
            </div>
        </div>
    )
}
