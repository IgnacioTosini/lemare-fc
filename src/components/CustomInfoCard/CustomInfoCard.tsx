import { IoPeople } from "react-icons/io5";
import { TfiCup } from "react-icons/tfi";
import { FaVideo } from "react-icons/fa";
import './_customInfoCard.scss'
import { CustomButton } from "../CustomButton/CustomButton";

type CustomInfoCardProps = {
    title: string
    image: 'player' | 'cup' | 'multimedia'
    description: string
    titleButton: string
    url?: string
}

export const CustomInfoCard = ({ title, image, description, titleButton, url }: CustomInfoCardProps) => {
    const imagePath = {
        player: <IoPeople />,
        cup: <TfiCup />,
        multimedia: <FaVideo />,
    }[image]

    return (
        <div className='customInfoCard'>
            <div className="icon">{imagePath}</div>
            <h2 className="title">{title}</h2>
            <p className="description">{description}</p>
            <CustomButton text={titleButton} typeOfButton={false} url={url} />
        </div>
    )
}
