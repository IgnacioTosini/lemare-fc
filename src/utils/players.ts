import { SocialMediaType } from "../types/socialMedia";

export const normalizeSocialMediaType = (type: string): SocialMediaType | undefined => {
    const normalizedType = Object.values(SocialMediaType).find(
        (value) => value.toLowerCase() === type.toLowerCase()
    );
    return normalizedType as SocialMediaType | undefined;
};