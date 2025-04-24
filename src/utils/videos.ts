import { Video, PlaylistResponse, VideoDetailsResponse } from "../types";

export const fetchPlaylistVideos = async (playlistId: string, apiKey: string, fromDate?: string): Promise<Video[]> => {
    const baseUrl = 'https://youtube.googleapis.com/youtube/v3/playlistItems';
    let videos: Video[] = [];
    let nextPageToken: string | undefined = undefined;

    do {
        const response = await fetch(
            `${baseUrl}?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50&pageToken=${nextPageToken || ''}&key=${apiKey}`
        );

        if (!response.ok) {
            console.error(`Error fetching playlist videos for playlistId: ${playlistId}`);
            return [];
        }

        const data: PlaylistResponse = await response.json();

        // Filtrar videos por fecha si se proporciona `fromDate`
        const filteredItems = fromDate
            ? data.items.filter((item) => new Date(item.contentDetails.videoPublishedAt) >= new Date(fromDate))
            : data.items;

        // Si no hay más videos que cumplan con la fecha, detener la búsqueda
        if (fromDate && filteredItems.length === 0) {
            break;
        }

        // Obtener los IDs de los videos
        const videoIds = filteredItems.map((item) => item.contentDetails.videoId).join(',');

        if (!videoIds) {
            nextPageToken = data.nextPageToken;
            continue;
        }

        // Realizar una solicitud adicional para obtener la duración de los videos
        const videoDetailsResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${videoIds}&key=${apiKey}`
        );

        if (!videoDetailsResponse.ok) {
            console.error('Error fetching video details');
            return [];
        }

        const videoDetailsData: VideoDetailsResponse = await videoDetailsResponse.json();

        // Filtrar y mapear los videos
        const pageVideos: Video[] = videoDetailsData.items
            .filter((item) => {
                const duration = parseDuration(item.contentDetails.duration);
                return duration > 300; // Filtrar videos que duren más de 5 minutos
            })
            .map((item) => {
                const duration = parseDuration(item.contentDetails.duration);
                const formattedDuration = formatDuration(duration); // Formatear la duración

                return {
                    id: item.id,
                    title: item.snippet.title,
                    url: `https://www.youtube.com/watch?v=${item.id}`,
                    thumbnail: item.snippet.thumbnails.high.url,
                    date: item.snippet.publishedAt,
                    creator: item.snippet.channelTitle || 'Unknown',
                    type: 'Video',
                    duration: formattedDuration, // Asignar la duración formateada
                };
            });

        videos = [...videos, ...pageVideos];
        nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    // Ordenar por fecha descendente
    return videos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Función para convertir la duración ISO 8601 a segundos
const parseDuration = (duration: string): number => {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || '0', 10);
    const minutes = parseInt(match[2] || '0', 10);
    const seconds = parseInt(match[3] || '0', 10);

    return hours * 3600 + minutes * 60 + seconds;
};

// Función para formatear la duración en formato hh:mm:ss
const formatDuration = (seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return [
        hrs > 0 ? hrs.toString().padStart(2, '0') : null,
        mins.toString().padStart(2, '0'),
        secs.toString().padStart(2, '0'),
    ]
        .filter(Boolean)
        .join(':');
};
