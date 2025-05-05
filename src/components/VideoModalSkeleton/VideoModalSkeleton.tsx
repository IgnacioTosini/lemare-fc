import './_videoModalSkeleton.scss'

export const VideoModalSkeleton = () => {
    return (
        <div className="videoItem videoItemSkeleton">
            <a href={'#'} rel='noopener noreferrer' className='videoThumbnail videoThumbnailSkeleton'>
                <img src={''} alt={''} />
                <div className='videoInfo videoInfoSkeleton'>
                    <section className="videoDetails videoDetailsSkeleton">
                    </section>
                </div>
            </a>
        </div>
    )
}
