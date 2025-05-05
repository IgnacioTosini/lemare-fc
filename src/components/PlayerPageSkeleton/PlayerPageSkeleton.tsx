import { PlayerCardSkeleton } from '../PlayerCardSkeleton/PlayerCardSkeleton'
import './_playerPageSkeleton.scss'

export const PlayerPageSkeleton = () => {
    return (
        <section className='playerPage skeleton'>
            <div className="playerDetail detailSkeleton">
                <div className='playerCardContainer'>
                    <PlayerCardSkeleton />
                </div>
                <section className='playerInfo infoSkeleton'>
                    <section className='playerDescription skeleton'>
                    </section>
                    <section className='playerStats playerStatsSkeleton'>
                        <ul className='statsList'>
                        </ul>
                    </section>
                </section>
            </div>
        </section>
    )
}
