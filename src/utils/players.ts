import { Player } from "../types";
import { Position } from "../types/positions";
import { SocialMediaType } from "../types/socialMedia";

export const players: Player[] = [
    {
        id: 1,
        name: 'John Doe',
        description: 'Head Coach',
        image: 'https://placehold.co/400x500',
        position: Position.CUERPO_TECNICO,
        country: 'Argentina',
        age: 35,
        socialMedia: [
            {
                typeOfSocialMedia: SocialMediaType.INSTAGRAM,
                url: 'https://www.youtube.com/@santiagotosini'
            }
        ],
    },
    {
        id: 2,
        name: 'Jane Smith',
        description: 'Assistant Coach',
        image: 'https://placehold.co/400x500',
        position: Position.CUERPO_TECNICO,
        country: 'Argentina',
        age: 35,
        socialMedia: [
            {
                typeOfSocialMedia: SocialMediaType.FACEBOOK,
                url: 'https://www.facebook.com/janesmith'
            }
        ],
    },
    {
        id: 3,
        name: 'Alice Brown',
        description: 'Fitness Coach',
        image: 'https://placehold.co/400x500',
        position: Position.CUERPO_TECNICO,
        country: 'Argentina',
        age: 35,
        socialMedia: [
            {
                typeOfSocialMedia: SocialMediaType.LINKEDIN,
                url: 'https://www.linkedin.com/in/alicebrown/'
            }
        ],
    },
    {
        id: 4,
        name: 'John Doe',
        image: 'https://placehold.co/400x500',
        number: 10,
        year: 2002,
        age: 21,
        height: 1.85,
        country: 'Argentina',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        position: Position.ARQUERO,
        stats: {
            goals: 5,
            assists: 3,
            matches: 10,
            yellowCards: 1,
            redCards: 0
        },
        socialMedia: [
            {
                typeOfSocialMedia: SocialMediaType.INSTAGRAM,
                url: 'https://www.youtube.com/@santiagotosini'
            },
            {
                typeOfSocialMedia: SocialMediaType.YOUTUBE,
                url: 'https://www.youtube.com/@lemarefc'
            },
            {
                typeOfSocialMedia: SocialMediaType.TIKTOK,
                url: 'https://www.tiktok.com/@lemarefc'
            }
        ],
    },
    {
        id: 5,
        name: 'Jane Smith',
        image: 'https://placehold.co/400x500',
        number: 8,
        year: 2001,
        age: 22,
        height: 1.85,
        country: 'Argentina',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        position: Position.DEFENSOR,
        stats: {
            goals: 2,
            assists: 7,
            matches: 10,
            yellowCards: 1,
            redCards: 0
        },
        socialMedia: [
            {
                typeOfSocialMedia: SocialMediaType.INSTAGRAM,
                url: 'https://www.youtube.com/@santiagotosini'
            },
            {
                typeOfSocialMedia: SocialMediaType.YOUTUBE,
                url: 'https://www.youtube.com/@lemarefc'
            },
            {
                typeOfSocialMedia: SocialMediaType.TIKTOK,
                url: 'https://www.tiktok.com/@lemarefc'
            }
        ],
    },
    {
        id: 6,
        name: 'Jane Smith',
        image: 'https://placehold.co/400x500',
        number: 8,
        year: 2001,
        age: 22,
        height: 1.85,
        country: 'Argentina',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        position: Position.DEFENSOR,
        stats: {
            goals: 2,
            assists: 7,
            matches: 10,
            yellowCards: 1,
            redCards: 0
        },
        socialMedia: [
            {
                typeOfSocialMedia: SocialMediaType.INSTAGRAM,
                url: 'https://www.youtube.com/@santiagotosini'
            },
            {
                typeOfSocialMedia: SocialMediaType.YOUTUBE,
                url: 'https://www.youtube.com/@lemarefc'
            },
            {
                typeOfSocialMedia: SocialMediaType.TIKTOK,
                url: 'https://www.tiktok.com/@lemarefc'
            }
        ],
    },
    {
        id: 7,
        name: 'Alice Brown',
        image: 'https://placehold.co/400x500',
        number: 5,
        year: 2001,
        age: 22,
        height: 1.85,
        country: 'Argentina',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        position: Position.MEDIOCAMPISTA,
        stats: {
            goals: 2,
            assists: 7,
            matches: 10,
            yellowCards: 1,
            redCards: 0
        },
        socialMedia: [
            {
                typeOfSocialMedia: SocialMediaType.INSTAGRAM,
                url: 'https://www.youtube.com/@santiagotosini'
            },
            {
                typeOfSocialMedia: SocialMediaType.YOUTUBE,
                url: 'https://www.youtube.com/@lemarefc'
            },
            {
                typeOfSocialMedia: SocialMediaType.TIKTOK,
                url: 'https://www.tiktok.com/@lemarefc'
            }
        ],
    },
    {
        id: 8,
        name: 'Bob White',
        image: 'https://placehold.co/400x500',
        number: 9,
        year: 2001,
        age: 22,
        height: 1.85,
        country: 'Argentina',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        position: Position.DELANTERO,
        stats: {
            goals: 2,
            assists: 7,
            matches: 10,
            yellowCards: 1,
            redCards: 0
        },
        socialMedia: [
            {
                typeOfSocialMedia: SocialMediaType.INSTAGRAM,
                url: 'https://www.youtube.com/@santiagotosini'
            },
            {
                typeOfSocialMedia: SocialMediaType.YOUTUBE,
                url: 'https://www.youtube.com/@lemarefc'
            },
            {
                typeOfSocialMedia: SocialMediaType.TIKTOK,
                url: 'https://www.tiktok.com/@lemarefc'
            }
        ],
    }
];