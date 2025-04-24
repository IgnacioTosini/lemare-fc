import { z } from 'zod';

const playerSchema = z.object({
    id: z.number(),
    name: z.string(),
    score: z.number(),
    year: z.number().optional(),
    position: z.string().optional(),
    yellowCards: z.number().optional(),
    redCards: z.number().optional(),
    assists: z.number().optional(),
    goals: z.number().optional(),
});

export type Player = z.infer<typeof playerSchema>;

export default playerSchema;

