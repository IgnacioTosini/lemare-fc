import { memo } from 'react';
import { Player } from '../../types';
import { CustomListSocialMedia } from '../CustomListSocialMedia/CustomListSocialMedia';
import { useCloudinaryWebp } from '../../hooks/useCloudinaryWebp';
import './_staffCard.scss'

type StaffCardProps = {
    staff: Player;
}

export const StaffCard = memo(({ staff }: StaffCardProps) => {
    const getWebpUrl = useCloudinaryWebp();
    return (
        <div className="staffCard">
            <div className="staffImageContainer">
                <img src={getWebpUrl(staff.image)} alt={staff.name} className='staffImage' loading="lazy" width="300" height="300" />
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
});
