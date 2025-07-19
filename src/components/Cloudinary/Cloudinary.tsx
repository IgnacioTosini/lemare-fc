import { useState, useEffect } from 'react';
import { useCloudinaryWebp } from '../../hooks/useCloudinaryWebp';
import { CloudinaryImage } from '../../types';
import { toast } from 'react-toastify';
import './_cloudinary.scss';

type CloudinaryProps = {
    onUpload: (image: CloudinaryImage | File) => void;
    preImage?: CloudinaryImage;
    pendingFile?: File;
};

export const Cloudinary = ({ onUpload, preImage, pendingFile }: CloudinaryProps) => {
    const [image, setImage] = useState<CloudinaryImage | null>(preImage || null);
    const [selectedFile, setSelectedFile] = useState<File | null>(pendingFile || null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        preImage?.url || (pendingFile ? URL.createObjectURL(pendingFile) : null)
    );
    const [isDragOver, setIsDragOver] = useState(false);

    const getWebpUrl = useCloudinaryWebp();

    const validateFile = (file: File): boolean => {
        // Validar que sea una imagen
        if (!file.type.startsWith('image/')) {
            toast.error('Por favor, selecciona solo archivos de imagen.');
            return false;
        }

        // Validar tamaño del archivo (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            toast.error('El archivo es demasiado grande. El tamaño máximo permitido es 5MB.');
            return false;
        }

        return true;
    };

    const processFile = (file: File) => {
        if (!validateFile(file)) return;

        setSelectedFile(file);
        setImage(null); // Limpiar imagen anterior

        // Limpiar preview URL anterior si existe
        if (previewUrl && !preImage) {
            URL.revokeObjectURL(previewUrl);
        }

        // Crear preview URL para mostrar la imagen seleccionada
        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);

        // Pasar el archivo al componente padre
        onUpload(file);
    };

    const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        processFile(files[0]);
    };

    // Handlers para drag & drop
    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    };

    const clearSelection = () => {
        if (selectedFile && previewUrl && !preImage) {
            URL.revokeObjectURL(previewUrl);
        }
        setSelectedFile(null);
        setPreviewUrl(preImage?.url || null);
        setImage(preImage || null);
        
        // Notificar al componente padre si necesita limpiar el valor
        if (preImage) {
            onUpload(preImage);
        }
    };

    // Cleanup URLs cuando el componente se desmonta o cambia el archivo
    useEffect(() => {
        return () => {
            if (selectedFile && previewUrl && !preImage) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [selectedFile, previewUrl, preImage]);

    return (
        <div className="cloudinary-container">
            <div 
                className={`upload-area ${previewUrl ? 'has-image' : ''} ${isDragOver ? 'drag-over' : ''}`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    name="file"
                    className="file-input"
                    onChange={handleFileSelection}
                    accept="image/*"
                />
                
                {!previewUrl ? (
                    <>
                        <div className="upload-icon">📸</div>
                        <div className="upload-text">
                            {isDragOver ? 'Suelta la imagen aquí' : 'Haz clic para seleccionar una imagen'}
                        </div>
                        <div className="upload-subtext">
                            O arrastra y suelta aquí (máx. 5MB)
                        </div>
                    </>
                ) : (
                    <>
                        <div className="upload-icon">✓</div>
                        <div className="upload-text">
                            {selectedFile ? 'Imagen seleccionada' : 'Imagen actual'}
                        </div>
                        <div className="upload-subtext">
                            {isDragOver ? 'Suelta para cambiar la imagen' : 'Haz clic para cambiar la imagen'}
                        </div>
                    </>
                )}
            </div>

            {previewUrl && (
                <div className="image-preview-container">
                    <img
                        src={image ? getWebpUrl(image.url) : previewUrl}
                        className='preview'
                        alt="imagen seleccionada"
                        loading="lazy"
                    />
                    {selectedFile && (
                        <div className="file-info">
                            <p>📄 {selectedFile.name}</p>
                            <p>📊 Tamaño: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            <p>📅 Tipo: {selectedFile.type}</p>
                            <button type="button" onClick={clearSelection} className="clear-btn">
                                🗑️ Limpiar selección
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};