import { Player } from "../types";

export const staff: Player[] = [
    {
        id: 1,
        name: 'John Doe',
        description: 'Head Coach',
        image: 'https://placehold.co/400x500',
        socialMedia: [
            {
                typeOfSocialMedia: 'instagram',
                url: 'https://www.instagram.com/johndoe/'
            }
        ],
    },
    {
        id: 2,
        name: 'Jane Smith',
        description: 'Assistant Coach',
        image: 'https://placehold.co/400x500',
        socialMedia: [
            {
                typeOfSocialMedia: 'facebook',
                url: 'https://www.facebook.com/janesmith'
            }
        ],
    },
    {
        id: 3,
        name: 'Alice Brown',
        description: 'Fitness Coach',
        image: 'https://placehold.co/400x500',
        socialMedia: [
            {
                typeOfSocialMedia: 'linkedin',
                url: 'https://www.linkedin.com/in/alicebrown/'
            }
        ],
    }
];