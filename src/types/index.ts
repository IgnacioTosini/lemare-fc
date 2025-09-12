import { Position } from "./positions";
import { SocialMediaType } from "./socialMedia";

/* ============================
 * API (lo que viene del backend)
 * ============================ */

export type ApiResponse<T> = {
    message: string;
    data: T;
    status?: string;
};

export type PlayerImage = {
    id: number;
    url: string;         // mapea a imageUrl con @JsonProperty("url")
    publicId: string;
    format?: string;
    width?: number;
    height?: number;
};

export type Stats = {
    id?: number;          // en API siempre viene id cuando existe
    goals: number;
    assists: number;
    matchesPlayed: number;
    yellow_cards: number; // mapea a yellowCards en entidad
    red_cards: number;    // mapea a redCards en entidad
    player_id?: number; // puede venir en GET /jugadores/{id}
};

export type SocialMedia = {
    id?: number;
    typeOfSocialMedia: SocialMediaType;
    url: string;
};

export type SocialMediaPayload = {
    typeOfSocialMedia: SocialMediaType;
    url: string | string[];
};

export type Player = {
    id: number;
    name: string;
    createdAt?: string;
    images: PlayerImage[];
    number: number;
    year: number;
    age: number;
    country: string;
    height: number;
    position: Position;
    description: string;
    stats: Stats;
    socialMedia?: SocialMedia[];
    active: boolean;
};

// playerFormSchema.ts
export type PlayerFormValues = {
    id?: number;              // opcional en formulario
    name: string;
    images?: (PlayerImage | File)[]; // permite subir nuevos archivos
    number: number;
    year: number;
    age: number;
    country: string;
    height: number;
    position: Position;
    description: string;
    active?: boolean;
    stats: {
        id?: number;
        goals: number;
        assists: number;
        matchesPlayed: number;
        yellow_cards: number;
        red_cards: number;
        player_id?: number;
    };
    socialMedia?: {
        id?: number;
        typeOfSocialMedia: SocialMediaType;
        url: string;
    }[];
};

// Mapeo a payload para backend
export type PlayerPayload = Omit<Player, "images"> & {
    images?: File[]; // solo archivos a subir
};

export type Video = {
    id: string;
    creator: string;
    url: string;
    thumbnail: string;
    title: string;
    date: string;
    type: string;
    duration: string;
}

export type PlaylistItem = {
    contentDetails: {
        videoId: string;
        videoPublishedAt: string;
    };
    snippet: {
        title: string;
        publishedAt: string;
        thumbnails: {
            high: {
                url: string;
            };
        };
    };
};

export type PlaylistResponse = {
    items: PlaylistItem[];
    nextPageToken?: string;
};

export type VideoDetailsItem = {
    id: string;
    contentDetails: {
        duration: string;
    };
    snippet: {
        channelTitle: string;
        title: string;
        publishedAt: string;
        thumbnails: {
            high: {
                url: string;
            };
        };
    };
};

export type VideoDetailsResponse = {
    items: VideoDetailsItem[];
};

export type Match = {
    id: string;
    date: string;
    time: string;
    homeTeam: string;
    awayTeam: string;
    homeScore?: number;
    awayScore?: number;
    location: string;
};

export type TournamentTableEntry = {
    position: number;
    teamName: string;
    matchesPlayed: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
};

export type TournamentTable = {
    entries: TournamentTableEntry[];
};

export type MainTeamMatchInfo = {
    date: string;
    time: string;
    opponent: string;
    location: string;
};