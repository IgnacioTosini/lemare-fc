import { Position } from "./positions";
import { SocialMediaType } from "./socialMedia";

export type Player = {
    id: number;
    name: string;
    image?: string;
    number?: number;
    year?: number;
    age?: number;
    country?: string;
    height?: number;
    position?: Position;
    description?: string;
    stats?: Stats;
    socialMedia: SocialMedia[];
};

export type Stats = {
    goals: number;
    assists: number;
    matches: number;
    yellowCards: number;
    redCards: number;
}

export type SocialMedia = {
    typeOfSocialMedia: SocialMediaType;
    url: string | string[];
}

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