import { useRef } from 'react';
import { useGsapFadeInUp } from '../../hooks/useGsapFadeInUp';
import { VideoGallery } from '../../components';
import './_multimediaPage.scss'

export const MultimediaPage = () => {
    const headerTitleRef = useRef<HTMLHeadingElement | null>(null);
    const headerDescRef = useRef<HTMLParagraphElement | null>(null);
    const contentRef = useRef<HTMLElement | null>(null);

    useGsapFadeInUp(headerTitleRef, 0);
    useGsapFadeInUp(headerDescRef, 0.2);
    useGsapFadeInUp(contentRef, 0.4);

    return (
        <section className='multimediaPage'>
            <header className='multimediaPageHeader'>
                <h1 ref={headerTitleRef}>Multimedia</h1>
                <p ref={headerDescRef}>Explora nuestra galería de fotos y videos para revivir los mejores momentos de Lemare FC dentro y fuera del campo.</p>
            </header>
            <section className='multimediaContent' ref={contentRef}>
                <VideoGallery />
            </section>
        </section>
    )
}
