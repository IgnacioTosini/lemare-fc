import { SocialMedia } from "../../types";
import { CustomSocialMedia } from "../CustomSocialMedia/CustomSocialMedia";
import './_customListSocialMedia.scss';

type CustomListSocialMediaProps = {
    socialMedia: SocialMedia[];
};

export const CustomListSocialMedia = ({ socialMedia }: CustomListSocialMediaProps) => {
    return (
        <div className="customListSocialMedia">
            {socialMedia.map((media, index) => (
                <CustomSocialMedia key={index} typeOfSocialMedia={media.typeOfSocialMedia} url={media.url} />
            ))}
        </div>
    );
};
