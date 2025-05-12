import { VideoGallery } from '../../components';
import { Helmet } from 'react-helmet-async';
import './_multimediaPage.scss'

export const MultimediaPage = () => {
    return (
        <>
            <Helmet>
                <title>Multimedia | Lemare FC</title>
                <meta name="description" content="Galería de fotos y videos de Lemare FC. Revive los mejores momentos del club." />
            </Helmet>
            <section className='multimediaPage'>
                <header className='multimediaPageHeader'>
                    <h1>Multimedia</h1>
                    <p>Explora nuestra galería de fotos y videos para revivir los mejores momentos de Lemare FC dentro y fuera del campo.</p>
                </header>
                <section className='multimediaContent'>
                    <VideoGallery />
                </section>
            </section>
        </>
    )
}
