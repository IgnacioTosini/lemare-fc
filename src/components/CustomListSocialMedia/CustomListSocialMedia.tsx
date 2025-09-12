import { SocialMediaPayload } from "../../types";
import { CustomSocialMedia } from "../CustomSocialMedia/CustomSocialMedia";
import './_customListSocialMedia.scss';

type CustomListSocialMediaProps = {
    socialMedia: SocialMediaPayload[];
};

export const CustomListSocialMedia = ({ socialMedia }: CustomListSocialMediaProps) => {
    return (
        <ul className="customListSocialMedia">
            {socialMedia.map((media, index) => (
                <li key={index}>
                    <CustomSocialMedia typeOfSocialMedia={media.typeOfSocialMedia} url={media.url} />
                </li>
            ))}
        </ul>
    );
};
