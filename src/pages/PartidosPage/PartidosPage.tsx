import './_partidosPage.scss'
import { Helmet } from 'react-helmet-async';

export const PartidosPage = () => {
  return (
    <>
      <Helmet>
        <title>Partidos | Lemare FC</title>
        <meta name="description" content="Calendario y resultados de los partidos de Lemare FC." />
      </Helmet>
      <div className='partidosPage'>
        
      </div>
    </>
  )
}
