import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { VideoGallery } from '../../components';
import './_multimediaPage.scss'

export const MultimediaPage = () => {
    const headerTitleRef = useRef<HTMLHeadingElement | null>(null);
    const headerDescRef = useRef<HTMLParagraphElement | null>(null);
    const contentRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (headerTitleRef.current) {
            gsap.fromTo(headerTitleRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' });
        }
        if (headerDescRef.current) {
            gsap.fromTo(headerDescRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.2, ease: 'power3.out' });
        }
        if (contentRef.current) {
            gsap.fromTo(contentRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.4, ease: 'power3.out' });
        }
    }, []);

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
