import { Dispatch, SetStateAction, useMemo } from 'react';
import { Player } from '../../types';
import { SocialMediaType } from '../../types/socialMedia';
import { BiTrash } from 'react-icons/bi';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import './_socialMediaForm.scss';

export const SocialMediaForm = ({ formData, setFormData }: { formData: Player, setFormData: Dispatch<SetStateAction<Player>> }) => {

    const selectedOptions = useMemo(() => formData.socialMedia.map(social => social.typeOfSocialMedia), [formData.socialMedia]);

    const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const index = parseInt((e.target as HTMLButtonElement).getAttribute('data-index') || '0', 10);
        const newSocialMedia = [...formData.socialMedia];
        newSocialMedia.splice(index, 1);
        setFormData({ ...formData, socialMedia: newSocialMedia });
    };

    const onAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newSocialMedia = [...formData.socialMedia, { typeOfSocialMedia: '' as SocialMediaType, url: '' }];
        setFormData({ ...formData, socialMedia: newSocialMedia });
    };

    return (
        <section className="socialMediaForm">
            <button onClick={onAdd} disabled={formData.socialMedia.length >= Object.keys(SocialMediaType).length} className='addButton'>Add Social Media</button>
            {formData.socialMedia.length === 0 && <p>No hay redes sociales</p>}
            {formData.socialMedia.map((social, index) => (
                <div key={index} className='socialMediaContainer'>
                    <label>
                        Tipo de Red Social
                        <CustomSelect
                            type={SocialMediaType}
                            selectedValue={social.typeOfSocialMedia}
                            handleChange={(e) => {
                                const newSocialMedia = [...formData.socialMedia];
                                newSocialMedia[index].typeOfSocialMedia = e.target.value as SocialMediaType;
                                setFormData({ ...formData, socialMedia: newSocialMedia });
                            }}
                            name="typeOfSocialMedia"
                            disabledOptions={selectedOptions.filter(option => option !== social.typeOfSocialMedia)}
                        />
                    </label>
                    <label>
                        URL
                        <input type="text" name="url" value={social.url} onChange={(e) => {
                            const newSocialMedia = [...formData.socialMedia];
                            newSocialMedia[index].url = e.target.value;
                            setFormData({ ...formData, socialMedia: newSocialMedia });
                        }} />
                    </label>
                    <button onClick={onDelete}><BiTrash /></button>
                </div>
            ))}
        </section>
    )
};