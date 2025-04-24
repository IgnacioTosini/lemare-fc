import { useEffect, useState } from 'react';
import { Video } from '../../types';
import { fetchPlaylistVideos } from '../../utils/videos';
import { VideoModal } from '../VideoModal/VideoModal';
import './_videoGallery.scss';

export const VideoGallery = () => {
    const [playlistVideos, setPlaylistVideos] = useState<Video[]>([]);

    useEffect(() => {
        const fetchVideos = async () => {
            const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
            const playlistIds = ['UUyNp64Xv0IjpLepZp5PtZ6g', 'UUspkpETCmq6YeCh-2N0ZYOg']; // IDs de las playlists "uploads"
            const fromDate = '2025-04-01'; // Fecha desde la cual se quieren obtener los videos

            const allVideos: Video[] = [];

            for (const playlistId of playlistIds) {
                const fetchedVideos = await fetchPlaylistVideos(playlistId, apiKey, fromDate);
                allVideos.push(...fetchedVideos);
            }

            // Ordenar todos los videos combinados por fecha descendente
            const sortedVideos = allVideos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setPlaylistVideos(sortedVideos);
        };

        fetchVideos();
    }, []);

    return (
        <div className='videoGallery'>
            {
                playlistVideos.map((video) => (
                    <VideoModal key={video.id} video={video} />
                ))
            }
        </div>
    );
};
