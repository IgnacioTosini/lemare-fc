import { useRef } from 'react';
import { Position } from '../../types/positions'
import { usePlayerContext } from '../../context/playerStore';
import { PlayerCardSkeleton } from '../../components/PlayerCardSkeleton/PlayerCardSkeleton';
import { PlayerCard } from '../../components';
import { useGsapFadeInUp } from '../../hooks/useGsapFadeInUp';
import './_quienesSomosPage.scss'

export const QuienesSomosPage = () => {
  const { players: originalPlayers, isLoading } = usePlayerContext();
  const staffMembers = originalPlayers.filter((member) => member.position === Position.CUERPO_TECNICO);

  // Animaciones
  const headerRef = useRef<HTMLHeadingElement | null>(null);
  const staffSectionRef = useRef<HTMLElement | null>(null);
  const historyTitleRef = useRef<HTMLHeadingElement | null>(null);
  const historyDescRef = useRef<HTMLDivElement | null>(null);
  const shieldRef = useRef<HTMLImageElement | null>(null);
  const valuesTitleRef = useRef<HTMLHeadingElement | null>(null);
  const submenuRef = useRef<HTMLElement | null>(null);

  useGsapFadeInUp(headerRef, 0);
  useGsapFadeInUp(staffSectionRef, 0.15);
  useGsapFadeInUp(historyTitleRef, 0.3);
  useGsapFadeInUp(historyDescRef, 0.45);
  useGsapFadeInUp(shieldRef, 0.6);
  useGsapFadeInUp(valuesTitleRef, 0.75);
  useGsapFadeInUp(submenuRef, 0.9);

  return (
    <section className="quienesSomosPage">
      <header>
        <h1 ref={headerRef}>Staff Tecnico</h1>
      </header>
      {(isLoading || staffMembers.length === 0) && (
        <section className='staffSection' ref={staffSectionRef}>
          {Array.from({ length: 3 }).map((_, index) => (
            <PlayerCardSkeleton key={index} />
          ))}
        </section>
      )}
      <section className='staffSection' ref={staffSectionRef}>
        {staffMembers.map((member) => (
          <PlayerCard key={member.id} player={member} />
        ))}
      </section>
      <article className='historyContainer'>
        <section className='historySection'>
          <h1 className='historyTitle' ref={historyTitleRef}>Nuestra Historia</h1>
          <div ref={historyDescRef}>
            <p className='historyDescription'>Fundado en 2025, Lemare FC nació como un pequeño club de barrio con grandes aspiraciones. Lo que comenzó como un proyecto modesto de un grupo de amigos apasionados por el fútbol, ha crecido hasta convertirse en uno de los clubes más respetados de la región.</p>
            <p className='historyDescription'>Durante sus primeros años, el club compitió en ligas regionales, construyendo una base sólida y desarrollando una filosofía de juego distintiva. El punto de inflexión llegó en 1998, cuando el equipo logró su primer ascenso a la tercera división nacional, marcando el inicio de una nueva era.</p>
            <p className='historyDescription'>En 2010, tras años de trabajo constante y desarrollo de talento local, Lemare FC consiguió el ascenso a la segunda división. Solo cinco años después, en 2015, el sueño se hizo realidad con el histórico ascenso a la máxima categoría del fútbol nacional, donde compite actualmente.</p>
          </div>
        </section>
        <figure>
          <img src="/escudoDelLemareFC.png" alt="Escudo del Lemare FC" className='shieldImage' loading="lazy" width="300" height="300" ref={shieldRef} />
        </figure>
      </article>
      <section className='valuesAndPhilosophyContainer'>
        <h2 className='valuesAndPhilosophyTitle' ref={valuesTitleRef}>Valores y Filosofía</h2>
        <section className='submenuContainer' ref={submenuRef}>
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
