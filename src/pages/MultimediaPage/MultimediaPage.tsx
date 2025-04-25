import { VideoGallery } from '../../components';
import './_multimediaPage.scss'

export const MultimediaPage = () => {
    return (
        <div className='multimediaPage'>
            <section className='multimediaPageHeader'>
                <h1>Multimedia</h1>
                <p>Explora nuestra galería de fotos y videos para revivir los mejores momentos de Lemare FC dentro y fuera del campo.</p>
            </section>
                <section className='multimediaContent'>
                    <VideoGallery />
                </section>
        </div>
    )
}
