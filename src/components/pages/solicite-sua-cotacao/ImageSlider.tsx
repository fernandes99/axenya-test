import { ReactNode, useEffect, useState } from "react";
import { SECOND_IN_MILLISECONDS } from "../../../constants/time";

const pathImages = [
    '/img/background-medic-man-tech-02042023.png',
    '/img/background-medic-woman-tech-02042023.png'
]

interface PropsImageSlider {
    children: (pathImage: string, showImage: boolean) => any;
}

export const ImageSlider = ({ children }: PropsImageSlider) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [transition, setTransition] = useState(true);
    const pathImage = pathImages[imageIndex];
  
    useEffect(() => {
        const interval = setInterval(() => {
            setTransition(false);
            setTimeout(() => {
                setImageIndex((prevIndex) => (prevIndex + 1) % pathImages.length);
                setTransition(true);
            }, 500);
        }, SECOND_IN_MILLISECONDS * 5);
  
        return () => clearInterval(interval);
    }, []);

    return children(pathImage, transition);
};
