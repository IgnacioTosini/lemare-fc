import { Link } from 'react-router';
import { memo } from 'react';
import './_youtubeSubmenu.scss';

type SubmenuProps = {
    urls: string[];
};

export const YoutubeSubmenu = memo(({ urls }: SubmenuProps) => {
    const imageUrls = [
        {
            image: '/santiagoTosiniYT.webp',
            alt: 'Santiago Tosini',
        },
        {
            image: '/lucaNivioYT.webp',
            alt: 'Luca Nivio',
        },
    ];

    return (
        <div className="youtubeSubmenuWrapper">
            <div className="youtubeSubmenu">
                {imageUrls.map((imageUrl, index) => (
                    <Link key={index} to={urls[index]} target="_blank" className="submenuItem">
                        <img src={imageUrl.image} alt={imageUrl.alt} loading="lazy" />
                    </Link>
                ))}
            </div>
        </div>
    );
});