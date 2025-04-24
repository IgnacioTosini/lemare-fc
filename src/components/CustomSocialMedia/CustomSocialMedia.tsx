import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";
import './_customSocialMedia.scss'

type CustomSocialMediaProps = {
    typeOfSocialMedia: string;
    url: string;
}

export const CustomSocialMedia = ({ typeOfSocialMedia }: CustomSocialMediaProps) => {
    const socialMediaIcons = {
        instagram: <FaInstagram />,
        youtube: <FaYoutube />,
        tiktok: <FaTiktok />,
    };
    return (
        <Link to={`#${typeOfSocialMedia}`} className="socialMediaIcon">
            {socialMediaIcons[typeOfSocialMedia as 'instagram' | 'youtube' | 'tiktok']}
        </Link>
    )
}
