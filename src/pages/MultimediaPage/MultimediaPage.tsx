import { VideoGallery } from '../../components';
import './_multimediaPage.scss'

export const MultimediaPage = () => {
    return (
        <section className='multimediaPage'>
            <header className='multimediaPageHeader'>
                <h1>Multimedia</h1>
                <p>Explora nuestra galería de fotos y videos para revivir los mejores momentos de Lemare FC dentro y fuera del campo.</p>
            </header>
            <section className='multimediaContent'>
                <VideoGallery />
            </section>
        </section>
    )
}
