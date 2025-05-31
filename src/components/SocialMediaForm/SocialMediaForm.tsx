import { Dispatch, SetStateAction, useMemo } from 'react';
import { Player } from '../../types';
import { SocialMediaType } from '../../types/socialMedia';
import { BiTrash } from 'react-icons/bi';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { normalizeSocialMediaType } from '../../utils/players';
import './_socialMediaForm.scss';

type SocialMediaFormProps = {
    formData: Player;
    setFormData: Dispatch<SetStateAction<Player>>;
    handleBlur: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

export const SocialMediaForm = ({ formData, setFormData, handleBlur }: SocialMediaFormProps) => {

    const selectedOptions = useMemo(() => (formData.socialMedia ?? []).map(social => normalizeSocialMediaType(social.typeOfSocialMedia.toLocaleLowerCase()) || social.typeOfSocialMedia), [formData.socialMedia]);

    const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const index = parseInt((e.target as HTMLButtonElement).getAttribute('data-index') || '0', 10);
        const newSocialMedia = [...(formData.socialMedia || [])];
        newSocialMedia.splice(index, 1);
        setFormData({ ...formData, socialMedia: newSocialMedia });
    };

    const onAdd = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const newSocialMedia = [...(formData.socialMedia || []), { typeOfSocialMedia: '' as SocialMediaType, url: '' }];
        setFormData({ ...formData, socialMedia: newSocialMedia });
    };

    return (
        <section className="socialMediaForm">
            <button onClick={onAdd} disabled={(formData.socialMedia?.length || 0) >= Object.keys(SocialMediaType).length} className='addButton'>Add Social Media</button>
            {(formData.socialMedia?.length ?? 0) === 0 && <p>No hay redes sociales</p>}
            {(formData.socialMedia ?? []).map((social, index) => (
                <div key={index} className='socialMediaContainer'>
                    <label>
                        Tipo de Red Social
                        <CustomSelect
                            type={SocialMediaType}
                            selectedValue={normalizeSocialMediaType(social.typeOfSocialMedia.toLocaleLowerCase()) || ''}
                            handleChange={(e) => {
                                const newSocialMedia = [...(formData.socialMedia || [])];
                                newSocialMedia[index] = {
                                    ...newSocialMedia[index],
                                    typeOfSocialMedia: normalizeSocialMediaType(e.target.value.toLocaleLowerCase()) as SocialMediaType || e.target.value.toLocaleLowerCase() as SocialMediaType
                                };
                                setFormData({ ...formData, socialMedia: newSocialMedia });
                            }}
                            name="typeOfSocialMedia"
                            disabledOptions={selectedOptions.filter(option => option !== social.typeOfSocialMedia)}
                        />
                    </label>
                    <label>
                        URL
                        <input type="text" name="url" value={social.url} onChange={(e) => {
                            const newSocialMedia = [...(formData.socialMedia || [])];
                            newSocialMedia[index] = {
                                ...newSocialMedia[index],
                                url: e.target.value
                            };
                            setFormData({ ...formData, socialMedia: newSocialMedia });
                        }} onBlur={handleBlur} />
                        {social.url && social.url.length < 3 && <p className="error">La URL debe tener al menos 3 caracteres.</p>}
                    </label>
                    <button data-index={index} onClick={onDelete}><BiTrash /></button>
                </div>
            ))}
        </section>
    )
};