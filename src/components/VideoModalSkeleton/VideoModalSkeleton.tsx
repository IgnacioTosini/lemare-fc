import './_videoModalSkeleton.scss'
import { memo } from 'react';

export const VideoModalSkeleton = memo(() => {
    return (
        <div className="videoItem videoItemSkeleton">
            <a href={'#'} rel='noopener noreferrer' className='videoThumbnail videoThumbnailSkeleton'>
                <img src={''} alt={''} loading="lazy" />
                <div className='videoInfo videoInfoSkeleton'>
                    <section className="videoDetails videoDetailsSkeleton">
                    </section>
                </div>
            </a>
        </div>
    )
});
