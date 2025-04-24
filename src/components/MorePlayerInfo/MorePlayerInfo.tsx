import { Player } from '../../types'
import './_morePlayerInfo.scss'

type MorePlayerInfoProps = {
    player: Player
}

export const MorePlayerInfo = ({ player }: MorePlayerInfoProps) => {
    return (
        <div className='morePlayerInfo'>
            <div className='playerDetails'>
                <p>Nacionalidad: </p>
                <p>{player.country}</p>
            </div>
            <div className='playerDetails'>
                <p>Edad: </p>
                <p>{player.age}</p>
            </div>
            <div className='playerDetails'>
                <p>Altura: </p>
                <p>{player.height} m</p>
            </div>
        </div>
    )
}
