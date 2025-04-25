import { Link } from 'react-router';
import './_customButton.scss';

type CustomButtonProps = {
    text: string;
    typeOfButton: boolean;
    url: string | undefined;
}

export const CustomButton = ({ text, typeOfButton, url }: CustomButtonProps) => {
    return (
        <Link to={url || '/'} className={` ${typeOfButton ? 'banner-button' : 'secondary-button'}`}>{text}</Link>
    )
}