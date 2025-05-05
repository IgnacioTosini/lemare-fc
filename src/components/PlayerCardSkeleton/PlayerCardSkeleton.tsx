import './_playerCardSkeleton.scss'

export const PlayerCardSkeleton = () => {
    return (
        <div className='playerCard skeleton'>
            <div className='playerImageContainer'>
                <div className='skeletonImage'></div>
            </div>
            <div className='playerInfo'>
                <div className='skeletonText skeletonName'></div>
                <div className='skeletonText skeletonPosition'></div>
            </div>
        </div>
    );
};