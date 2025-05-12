import { useEffect, useState } from 'react';
import { Video } from '../../types';
import { fetchPlaylistVideos } from '../../utils/videos';
import { VideoModal } from '../VideoModal/VideoModal';
import { usePlayerContext } from '../../context/playerStore';
import { VideoModalSkeleton } from '../VideoModalSkeleton/VideoModalSkeleton';
import './_videoGallery.scss';

const CACHE_KEY = 'lemarefc_videos';

export const VideoGallery = () => {
    const [playlistVideos, setPlaylistVideos] = useState<Video[]>(() => {
        // Intenta cargar desde cache local
        const cached = localStorage.getItem(CACHE_KEY);
        return cached ? JSON.parse(cached) : [];
    });
    const [loading, setLoading] = useState(false);
    const { isLoading } = usePlayerContext();

    useEffect(() => {
        const fetchVideos = async () => {
            setLoading(true);
            const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
            const playlistIds = ['UUyNp64Xv0IjpLepZp5PtZ6g', 'UUspkpETCmq6YeCh-2N0ZYOg'];
            const fromDate = '2025-04-01';

            // Fetch en paralelo para mayor velocidad
            const fetches = playlistIds.map(id => fetchPlaylistVideos(id, apiKey, fromDate));
            const results = await Promise.all(fetches);
            const allVideos: Video[] = results.flat();

            // Ordenar por fecha descendente y limitar a los 12 más recientes
            const sortedVideos = allVideos
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 21);

            setPlaylistVideos(sortedVideos);
            localStorage.setItem(CACHE_KEY, JSON.stringify(sortedVideos));
            setLoading(false);
        };

        fetchVideos();
    }, []);

    const isSkeleton = loading || isLoading || playlistVideos.length === 0;

    return (
        <section className='videoGallery' aria-label="Galería de videos">
            <h1 style={{display: 'none'}}>Videos recientes de Lemare FC</h1>
            {isSkeleton ? (
                Array.from({ length: 6 }).map((_, index) => (
                    <VideoModalSkeleton key={index} />
                ))
            ) : (
                playlistVideos.map((video) => (
                    <VideoModal key={video.id} video={video} />
                ))
            )}
        </section>
    );
};