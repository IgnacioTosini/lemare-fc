import { StaffCard } from '../../components/StaffCard/StaffCard'
import { Position } from '../../types/positions'
import { usePlayerContext } from '../../context/playerStore';
import { PlayerCardSkeleton } from '../../components/PlayerCardSkeleton/PlayerCardSkeleton';
import './_quienesSomosPage.scss'

export const QuienesSomosPage = () => {
  const { players: originalPlayers, isLoading } = usePlayerContext();
  const staffMembers = originalPlayers.filter((member) => member.position === Position.CUERPO_TECNICO);

  return (
    <section className="quienesSomosPage">
      <header>
        <h1>Staff Tecnico</h1>
      </header>
      {(isLoading || staffMembers.length === 0) && (
        <section className='staffSection'>
          {Array.from({ length: 3 }).map((_, index) => (
            <PlayerCardSkeleton key={index} />
          ))}
        </section>
      )}
      <section className='staffSection'>
        {staffMembers.map((member) => (
          <StaffCard key={member.id} staff={member} />
        ))}
      </section>
      <article className='historyContainer'>
        <section className='historySection'>
          <h1 className='historyTitle'>Nuestra Historia</h1>
          <p className='historyDescription'>Fundado en 1985, Lemare FC nació como un pequeño club de barrio con grandes aspiraciones. Lo que comenzó como un proyecto modesto de un grupo de amigos apasionados por el fútbol, ha crecido hasta convertirse en uno de los clubes más respetados de la región.</p>
          <p className='historyDescription'>Durante sus primeros años, el club compitió en ligas regionales, construyendo una base sólida y desarrollando una filosofía de juego distintiva. El punto de inflexión llegó en 1998, cuando el equipo logró su primer ascenso a la tercera división nacional, marcando el inicio de una nueva era.</p>
          <p className='historyDescription'>En 2010, tras años de trabajo constante y desarrollo de talento local, Lemare FC consiguió el ascenso a la segunda división. Solo cinco años después, en 2015, el sueño se hizo realidad con el histórico ascenso a la máxima categoría del fútbol nacional, donde compite actualmente.</p>
          <p className='historyDescription'>Los últimos años han sido los más exitosos en la historia del club, con la consecución del primer título de liga en 2022 y la clasificación para competiciones europeas. Hoy, Lemare FC representa un modelo de gestión deportiva sostenible y un orgullo para toda la comunidad.</p>
        </section>
        <figure>
          <img src="/escudoDelLemareFC.png" alt="Escudo del Lemare FC" className='shieldImage' />
        </figure>
      </article>
      <section className='valuesAndPhilosophyContainer'>
        <h2 className='valuesAndPhilosophyTitle'>Valores y Filosofía</h2>
        <section className='submenuContainer'>
          <article className='submenuText'>
            <h2>Excelencia</h2>
            <p className='submenuDescription'>Buscamos la excelencia en todo lo que hacemos, tanto dentro como fuera del campo. Nos esforzamos por mejorar constantemente y superar nuestros propios límites.</p>
          </article>
          <article className='submenuText'>
            <h2>Comunidad</h2>
            <p className='submenuDescription'>Somos más que un club de fútbol; somos una familia y una parte integral de nuestra comunidad. Nos comprometemos a retribuir y a tener un impacto positivo en la sociedad.</p>
          </article>
          <article className='submenuText'>
            <h2>Tradición</h2>
            <p className='submenuDescription'>Honramos nuestra historia y tradiciones mientras miramos hacia el futuro. Respetamos a quienes construyeron este club y trabajamos para dejar un legado aún mayor.</p>
          </article>
        </section>
      </section>
    </section>
  )
}
