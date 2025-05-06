import { Link } from 'react-router';
import './_customButton.scss';

type CustomButtonProps = {
    text: string;
    typeOfButton: boolean;
    url: string | undefined;
    blank?: boolean;
}

export const CustomButton = ({ text, typeOfButton, url, blank }: CustomButtonProps) => {
    return (
        <Link
            to={url || '/'}
            className={` ${typeOfButton ? 'banner-button' : 'secondary-button'}`}
            target={blank ? '_blank' : undefined}
        >
            {text}
        </Link>
    )
}