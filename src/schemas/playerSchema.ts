import { z } from 'zod';

export const statsSchema = z.object({
    goals: z.number(),
    assists: z.number(),
    matches: z.number(),
    yellowCards: z.number(),
    redCards: z.number(),
});

export const socialMediaSchema = z.object({
    typeOfSocialMedia: z.enum(['facebook', 'twitter', 'instagram', 'tiktok', 'youtube', 'linkedin']).transform((val) => val.toLowerCase()),
    url: z.string().or(z.array(z.string())),
});

export const playerSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    image: z.string(),
    number: z.number().optional(),
    year: z.number(),
    age: z.number(),
    country: z.string(),
    height: z.number(),
    position: z.string(),
    description: z.string(),
    stats: statsSchema.optional(),
    socialMedia: z.array(socialMediaSchema).optional(),
});

export type Player = z.infer<typeof playerSchema>;
export type Stats = z.infer<typeof statsSchema>;
export type SocialMedia = z.infer<typeof socialMediaSchema>;

