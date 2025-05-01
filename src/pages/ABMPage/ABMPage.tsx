import { TablePlayers } from '../../components/TablePlayers/TablePlayers'
import './_abmPage.scss'

export const ABMPage = () => {
    return (
        <div className='abmPage'>
            <h1 className='title'>Administración de Jugadores/Staff</h1>
            <TablePlayers />
        </div>
    )
}
