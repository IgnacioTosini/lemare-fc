import { FaRegClock } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { Video } from '../../types';
import './_videoModal.scss'

type VideoModalProps = {
    video: Video;
}

export const VideoModal = ({ video }: VideoModalProps) => {
    return (
        <div className="videoItem">
            <a href={video.url} target='_blank' rel='noopener noreferrer' className='videoThumbnail'>
                <img src={video.thumbnail} alt={video.title} />
                <div className='videoInfo'>
                    <h3>{video.title}</h3>
                    <section className="videoDetails">
                        <section className="aditionalInfo">
                            <FaCalendarAlt className='calendarIcon' />
                            <p className="videoDate">{new Date(video.date).toLocaleDateString()}</p>
                        </section>
                        <section className="aditionalInfo">
                            <p className="videoCreator">{video.creator}</p>
                        </section>
                        <section className="aditionalInfo">
                            <FaRegClock className='clockIcon' />
                            <p className="videoDuration">{video.duration}</p>
                        </section>
                    </section>
                </div>
            </a>
        </div>
    )
}
