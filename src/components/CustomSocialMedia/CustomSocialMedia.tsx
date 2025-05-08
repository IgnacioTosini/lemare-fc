import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { YoutubeSubmenu } from "../YoutubeSubmenu/YoutubeSubmenu";
import { SocialMediaType } from "../../types/socialMedia";
import './_customSocialMedia.scss';

type CustomSocialMediaProps = {
    typeOfSocialMedia: string;
    url: string | string[];
};

export const CustomSocialMedia = ({ typeOfSocialMedia, url }: CustomSocialMediaProps) => {
    const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);

    const socialMediaIcons = {
        [SocialMediaType.INSTAGRAM.toLocaleLowerCase()]: <FaInstagram />,
        [SocialMediaType.YOUTUBE.toLocaleLowerCase()]: <FaYoutube />,
        [SocialMediaType.TIKTOK.toLocaleLowerCase()]: <FaTiktok />,
        [SocialMediaType.FACEBOOK.toLocaleLowerCase()]: <FaFacebook />,
        [SocialMediaType.LINKEDIN.toLocaleLowerCase()]: <FaLinkedin />,
        [SocialMediaType.TWITTER.toLocaleLowerCase()]: <FaTwitter />,
    };

    const toggleSubmenu = () => {
        setIsSubmenuVisible(!isSubmenuVisible);
    };

    return (
        <div className="socialMediaWrapper">
            {typeOfSocialMedia.toLocaleLowerCase() === SocialMediaType.YOUTUBE.toLocaleLowerCase() && Array.isArray(url) ? (
                <>
                    <div
                        className="socialMediaIcon"
                        onClick={toggleSubmenu}
                        tabIndex={0}
                        aria-expanded={isSubmenuVisible}
                        role="button"
                        aria-label="Abrir submenú de YouTube"
                    >
                        {socialMediaIcons[SocialMediaType.YOUTUBE.toLocaleLowerCase()] || null}
                    </div>
                    {isSubmenuVisible && <YoutubeSubmenu urls={url} />}
                </>
            ) : (
                <a
                    href={`${url}`}
                    target="_blank"
                    className="socialMediaIcon"
                    rel="noopener noreferrer"
                    aria-label={`Enlace a ${typeOfSocialMedia}`}
                >
                    {socialMediaIcons[typeOfSocialMedia.toLocaleLowerCase() as keyof typeof socialMediaIcons] || null}
                </a>
            )}
        </div>
    );
};
