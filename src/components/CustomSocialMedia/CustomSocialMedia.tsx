import { useState } from "react";
import { Link } from "react-router";
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";
import { YoutubeSubmenu } from "../YoutubeSubmenu/YoutubeSubmenu";
import './_customSocialMedia.scss';

type CustomSocialMediaProps = {
    typeOfSocialMedia: string;
    url: string | string[];
};

export const CustomSocialMedia = ({ typeOfSocialMedia, url }: CustomSocialMediaProps) => {
    const [isSubmenuVisible, setIsSubmenuVisible] = useState(false);

    const socialMediaIcons = {
        instagram: <FaInstagram />,
        youtube: <FaYoutube />,
        tiktok: <FaTiktok />,
        facebook: <FaFacebook />,
        linkedin: <FaLinkedin />,
        twitter: <FaTwitter />,
    };

    const toggleSubmenu = () => {
        setIsSubmenuVisible(!isSubmenuVisible);
    };

    return (
        <div className="socialMediaWrapper">
            {typeOfSocialMedia === 'youtube' && Array.isArray(url) ? (
                <>
                    <div className="socialMediaIcon" onClick={toggleSubmenu}>
                        {socialMediaIcons.youtube}
                    </div>
                    {isSubmenuVisible && <YoutubeSubmenu urls={url} isVisible={isSubmenuVisible} />}
                </>
            ) : (
                <Link to={`${url}`} target="_blank" className="socialMediaIcon">
                    {socialMediaIcons[typeOfSocialMedia as keyof typeof socialMediaIcons] || null}
                </Link>
            )}
        </div>
    );
};
