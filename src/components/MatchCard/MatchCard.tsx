import { CustomButton } from '../CustomButton/CustomButton'
import { FaRegCalendarAlt } from "react-icons/fa";
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
                    </div>
                    <p className="matchCardTeams">Lemare FC vs Team Balanza</p>
                </div>
            </div>
            <div className="matchCardFooter">
                <CustomButton text='Ver Todos los Partidos' typeOfButton={false} />
            </div>
        </div>
    )
}
