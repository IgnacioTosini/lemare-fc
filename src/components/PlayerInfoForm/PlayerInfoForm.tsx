import { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { PlayerFormValues } from '../../schemas/playerFormSchema';
import { Position } from '../../types/positions';
import { CustomSelect } from '../CustomSelect/CustomSelect';
import { Cloudinary } from '../Cloudinary/Cloudinary';
import { PlayerImage } from '../../types';
import { toast } from 'react-toastify';
import './_playerInfoForm.scss';

type PlayerInfoFormProps = {
    formData: PlayerFormValues;
    setFieldValue: (field: string, value: unknown) => void;
    setRemovedImages: React.Dispatch<React.SetStateAction<PlayerImage[]>>;
};

export const PlayerInfoForm = ({ formData, setFieldValue, setRemovedImages }: PlayerInfoFormProps) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageUpload = (image: PlayerImage | File) => {
        if (image instanceof File) {
            // Si es un archivo, lo añadimos al array de imágenes
            const updatedImages = [...(formData.images || []), image];
            setFieldValue("images", updatedImages);
        } else {
            // Si es una imagen de PlayerImage
            const updatedImages = [...(formData.images || []), image];
            setFieldValue("images", updatedImages);
            // Establecer la imagen seleccionada como la principal
            setSelectedImageIndex(updatedImages.length - 1); // La última imagen que subí
        }
    };

    const handleRemoveImage = (index: number) => {
        const updatedImages = [...(formData.images || [])];
        const [deletedImage] = updatedImages.splice(index, 1);

        if (!(deletedImage instanceof File)) {
            setRemovedImages(prev => [...prev, deletedImage]);
        }

        setFieldValue("images", updatedImages);
        setSelectedImageIndex(0);
        toast.info("Imagen eliminada de la lista. Se guardará el cambio al enviar el formulario.");
    };

    const calculateYearFromAge = (age: number): number[] => {
        const currentYear = new Date().getFullYear();

        // Si ya pasó su cumpleaños este año
        const yearIfBirthdayPassed = currentYear - age;
        // Si no ha cumplido años este año
        const yearIfBirthdayNotPassed = currentYear - age - 1;

        return [yearIfBirthdayNotPassed, yearIfBirthdayPassed];
    };

    const calculateAgeFromYear = (year: number): number[] => {
        const currentYear = new Date().getFullYear();

        // Si ya cumplió años este año
        const ageIfBirthdayPassed = currentYear - year;
        // Si no ha cumplido años este año
        const ageIfBirthdayNotPassed = currentYear - year - 1;

        return [ageIfBirthdayNotPassed, ageIfBirthdayPassed];
    };

    const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const age = parseInt(e.target.value);
        if (age && age > 0) {
            const possibleYears = calculateYearFromAge(age);
            // Tomar el año más probable (si no ha cumplido años)
            setFieldValue('year', possibleYears[1]);
        }
        setFieldValue('age', age);
    };

    const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const year = parseInt(e.target.value);
        if (year && year > 0) {
            const possibleAges = calculateAgeFromYear(year);
            // Tomar la edad más probable (si ya cumplió años)
            setFieldValue('age', possibleAges[1]);
        }
        setFieldValue('year', year);
    };

    return (
        <section className="playerInfoForm">
            <label>
                Nombre
                <Field type="text" name="name" placeholder='Nombre' />
                <ErrorMessage name="name" component="p" className="error" />
            </label>

            <label>
                Imagen
                <Cloudinary
                    onUpload={handleImageUpload}
                    preImage={
                        Array.isArray(formData.images) &&
                            formData.images[selectedImageIndex] && !(formData.images[selectedImageIndex] instanceof File)
                            ? formData.images[selectedImageIndex]
                            : undefined
                    }
                    pendingFile={
                        Array.isArray(formData.images) &&
                            formData.images[selectedImageIndex] instanceof File
                            ? formData.images[selectedImageIndex]
                            : undefined
                    }
                />

                <ErrorMessage name="images" component="p" className="error" />

            </label>
            {Array.isArray(formData.images) && formData.images.length > 0 && (
                <div className="images-preview">
                    {formData.images.map((img, index) => (
                        <div
                            key={index}
                            className={`image-wrapper ${index === selectedImageIndex ? "active" : ""}`}
                            onClick={() => setSelectedImageIndex(index)}
                        >
                            <button
                                type="button"
                                className="remove-btn"
                                onClick={(e) => {
                                    e.stopPropagation(); // evita que cambie la selección al borrar
                                    handleRemoveImage(index);

                                    // si borraste la imagen seleccionada, resetear índice
                                    if (index === selectedImageIndex) {
                                        setSelectedImageIndex(0);
                                    }
                                }}
                            >
                                ✕
                            </button>

                            {img instanceof File ? (
                                <img
                                    src={URL.createObjectURL(img)}
                                    alt={`preview-${index}`}
                                    className="preview-img"
                                    onClick={() => setSelectedImageIndex(index)}
                                />
                            ) : (
                                <img
                                    src={img.url}
                                    alt={`preview-${index}`}
                                    className="preview-img"
                                    onClick={() => setSelectedImageIndex(index)}
                                />
                            )}
                        </div>
                    ))}
                </div>
            )}

            <label>
                Número
                <Field type="number" name="number" placeholder='5' min={1} />
                <ErrorMessage name="number" component="p" className="error" />
            </label>

            <label>
                País
                <Field type="text" name="country" placeholder='Argentina' />
                <ErrorMessage name="country" component="p" className="error" />
            </label>

            <label>
                Posición
                <Field name="position">
                    {({ field }: { field: { value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void } }) => (
                        <CustomSelect
                            type={Position}
                            selectedValue={field.value || ''}
                            handleChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue('position', e.target.value)}
                            name="position"
                            disabledOptions={['Admin']}
                        />
                    )}
                </Field>
                <ErrorMessage name="position" component="p" className="error" />
            </label>

            <label>
                Edad
                <Field name="age" min={16}>
                    {({ field }: { field: { value: number; name: string } }) => (
                        <input
                            type="number"
                            {...field}
                            onChange={handleAgeChange}
                            placeholder='24'
                        />
                    )}
                </Field>
                <ErrorMessage name="age" component="p" className="error" />
            </label>

            <label>
                Año de nacimiento
                <Field name="year">
                    {({ field }: { field: { value: number; name: string } }) => (
                        <input
                            type="number"
                            {...field}
                            onChange={handleYearChange}
                            placeholder='1999'
                        />
                    )}
                </Field>
                <ErrorMessage name="year" component="p" className="error" />
            </label>

            <label>
                Altura
                <Field type='number' name="height" step="0.01" placeholder='1.80' />
                <ErrorMessage name="height" component="p" className="error" />
            </label>

            <label className='description'>
                Descripción
                <Field as="textarea" name="description" />
                <ErrorMessage name="description" component="p" className="error" />
            </label>
        </section>
    );
};