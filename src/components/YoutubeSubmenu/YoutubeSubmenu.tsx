import { Link } from 'react-router';
import './_youtubeSubmenu.scss';

type SubmenuProps = {
    urls: string[];
};

export const YoutubeSubmenu = ({ urls }: SubmenuProps) => {
    const imageUrls = [
        {
            image: '/santiagoTosiniYT.jpg',
            alt: 'Santiago Tosini',
        },
        {
            image: '/lucaNivioYT.jpg',
            alt: 'Luca Nivio',
        },
    ];

    return (
        <div className="youtubeSubmenuWrapper">
            <div className="youtubeSubmenu">
                {imageUrls.map((imageUrl, index) => (
                    <Link key={index} to={urls[index]} target="_blank" className="submenuItem">
                        <img src={imageUrl.image} alt={imageUrl.alt} />
                    </Link>
                ))}
            </div>
        </div>
    );
};