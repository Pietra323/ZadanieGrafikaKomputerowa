import { useState, useEffect, useRef } from 'react';
import ConeModel from "../Models/ConeModel";

export const useConeController = (coneModelRef, mountRef) => {
    const [isDragging, setIsDragging] = useState(false);
    const [prevMousePosition, setPrevMousePosition] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [variantIndex, setVariantIndex] = useState(0);
    const model = useRef(new ConeModel()).current;

    useEffect(() => {
        const handleMouseDown = (event) => {
            if (event.button === 0 && mountRef.current && mountRef.current.contains(event.target)) {
                setIsDragging(true);
                setPrevMousePosition({ x: event.clientX, y: event.clientY });
            }
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

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        const mountElement = mountRef.current;
        if (mountElement) {
            mountElement.addEventListener('mousedown', handleMouseDown);
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            if (mountElement) {
                mountElement.removeEventListener('mousedown', handleMouseDown);
            }
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, prevMousePosition, mountRef]);

    const changetocolor = (index) => {
        setVariantIndex(index);
        if (coneModelRef.current) {
            coneModelRef.current.setColorVariant(index);
        }
    };

    return {
        rotation,
        changetocolor,
    };
};
