
export type Player = {
    id: number;
    name: string;
    image?: string;
    number?: number;
    year?: number;
    age?: number;
    country?: string;
    height?: number;
    position?: string;
    description?: string;
    stats: Stats;
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
    typeOfSocialMedia: string;
    url: string;
}