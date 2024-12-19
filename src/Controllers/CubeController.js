import { useEffect, useRef, useState } from 'react';
import CubeModel from '../Models/CubeModel';

export const useCubeController = () => {
    const model = useRef(new CubeModel()).current;
    const cubeRef = useRef(model.getMesh());
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [prevMousePosition, setPrevMousePosition] = useState({ x: 0, y: 0 });

    const changetocolor = (variantIndex) => {
        model.setColorVariant(variantIndex);
    };

    const handleMouseMove = (event) => {
        if (isDragging) {
            const deltaX = event.clientX - prevMousePosition.x;
            const deltaY = event.clientY - prevMousePosition.y;

            setRotation((prevRotation) => ({
                x: prevRotation.x + deltaY * 0.01,
                y: prevRotation.y + deltaX * 0.01,
            }));

            setPrevMousePosition({ x: event.clientX, y: event.clientY });
        }
    };

    const handleMouseDown = (event) => {
        setIsDragging(true);
        setPrevMousePosition({ x: event.clientX, y: event.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return {
        cubeRef,
        rotation,
        handleMouseMove,
        handleMouseDown,
        handleMouseUp,
        changetocolor,
    };
};