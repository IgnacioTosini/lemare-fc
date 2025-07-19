import { z } from 'zod';

export const statsSchema = z.object({
    goals: z.number(),
    assists: z.number(),
    matches: z.number(),
    yellowCards: z.number(),
    redCards: z.number(),
});

export const socialMediaSchema = z.object({
    typeOfSocialMedia: z.enum(['instagram', 'facebook', 'twitter', 'youtube', 'tiktok', 'linkedin']).transform((val) => val.toLowerCase()),
    url: z.string(),
});

export const cloudinaryImageSchema = z.object({
    url: z.string(),
    public_id: z.string(),
});

export const playerSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    image: cloudinaryImageSchema.nullable(), // Cambiar a cloudinaryImageSchema
    number: z.number().min(1).max(99),
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

