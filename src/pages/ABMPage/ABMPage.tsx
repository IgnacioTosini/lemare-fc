import { TablePlayers } from '../../components/TablePlayers/TablePlayers'
import './_abmPage.scss'

export const ABMPage = () => {
    return (
        <section className='abmPage'>
            <header className='abmPageContainer'>
                <h1 className='title'>Administración de Jugadores/Staff</h1>
            </header>
            <section>
                <TablePlayers />
            </section>
        </section>
    )
}
