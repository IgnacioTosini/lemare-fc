import { TablePlayers } from '../../components/TablePlayers/TablePlayers'
import { Helmet } from 'react-helmet-async';
import './_abmPage.scss'

export const ABMPage = () => {
    return (
        <>
            <Helmet>
                <title>Administración | Lemare FC</title>
                <meta name="description" content="Panel de administración de jugadores y staff de Lemare FC." />
            </Helmet>
            <section className='abmPage'>
                <header className='abmPageContainer'>
                    <h1 className='title'>Administración de Jugadores/Staff</h1>
                </header>
                <section>
                    <TablePlayers />
                </section>
            </section>
        </>
    )
}
