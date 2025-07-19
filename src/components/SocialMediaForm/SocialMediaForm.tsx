import { FieldArray, Field, ErrorMessage } from 'formik';
import { PlayerFormValues } from '../../schemas/playerFormSchema';
import { SocialMediaType } from '../../types/socialMedia';
import { BiTrash } from 'react-icons/bi';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { normalizeSocialMediaType } from '../../utils/players';
import './_socialMediaForm.scss';

type SocialMediaFormProps = {
    formData: PlayerFormValues;
    setFieldValue: (field: string, value: unknown) => void;
};

export const SocialMediaForm = ({ formData, setFieldValue }: SocialMediaFormProps) => {
    const selectedOptions = (formData.socialMedia ?? []).map(social =>
        normalizeSocialMediaType(social.typeOfSocialMedia.toLowerCase()) || social.typeOfSocialMedia
    );

    return (
        <section className="socialMediaForm">
            <FieldArray name="socialMedia">
                {({ push, remove }) => (
                    <>
                        <button
                            type="button"
                            onClick={() => push({ typeOfSocialMedia: '', url: '' })}
                            disabled={(formData.socialMedia?.length || 0) >= Object.keys(SocialMediaType).length}
                            className='addButton'
                        >
                            Add Social Media
                        </button>

                        {(formData.socialMedia?.length ?? 0) === 0 && <p>No hay redes sociales</p>}

                        {(formData.socialMedia ?? []).map((social, index) => (
                            <div key={index} className='socialMediaContainer'>
                                <label>
                                    Tipo de Red Social
                                    <Field name={`socialMedia.${index}.typeOfSocialMedia`}>
                                        {({ field }: { field: { value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void } }) => (
                                            <CustomSelect
                                                type={SocialMediaType}
                                                selectedValue={normalizeSocialMediaType(field.value.toLowerCase()) || ''}
                                                handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                    const normalizedValue = normalizeSocialMediaType(e.target.value.toLowerCase()) as SocialMediaType;
                                                    setFieldValue(`socialMedia.${index}.typeOfSocialMedia`, normalizedValue || e.target.value.toLowerCase());
                                                }}
                                                name={`socialMedia.${index}.typeOfSocialMedia`}
                                                disabledOptions={selectedOptions.filter(option => option !== social.typeOfSocialMedia)}
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name={`socialMedia.${index}.typeOfSocialMedia`} component="p" className="error" />
                                </label>

                                <label>
                                    URL
                                    <Field
                                        type="text"
                                        name={`socialMedia.${index}.url`}
                                    />
                                    <ErrorMessage name={`socialMedia.${index}.url`} component="p" className="error" />
                                </label>

                                <button type="button" onClick={() => remove(index)}>
                                    <BiTrash />
                                </button>
                            </div>
                        ))}
                    </>
                )}
            </FieldArray>
        </section>
    );
};