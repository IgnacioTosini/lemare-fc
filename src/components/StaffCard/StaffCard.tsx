import { Player } from '../../types';
import { CustomListSocialMedia } from '../CustomListSocialMedia/CustomListSocialMedia';
import './_staffCard.scss'

type StaffCardProps = {
    staff: Player;
}

export const StaffCard = ({ staff }: StaffCardProps) => {
    return (
        <div className="staffCard">
            <div className="staffImageContainer">
                <img src={staff.image} alt={staff.name} className='staffImage' />
            </div>
            <div className="staffCardInfo">
                <h3 className="staffCardName">{staff.name.toUpperCase()}</h3>
                <p className="staffCardDescription">{staff.description}</p>
                <div className="staffCardSocialMedia">
                    <CustomListSocialMedia socialMedia={staff.socialMedia || []} />
                </div>
            </div>
        </div>
    )
}
