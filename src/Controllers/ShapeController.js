import { useState, useRef } from 'react';
import {ShapeModel} from "../Models/ShapeModel";

export const useShapeController = () => {
    const shapeModelRef = useRef(new ShapeModel());
    const [shapes, setShapes] = useState(shapeModelRef.current.getShapes());
    const [isDragging, setIsDragging] = useState(false);
    const [draggingIndex, setDraggingIndex] = useState(null);
    const dragStart = useRef({ x: 0, y: 0 });
    const [currentTool, setCurrentTool] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentDrawingShape, setCurrentDrawingShape] = useState(null);
    const startPoint = useRef({ x: 0, y: 0 });
    const [isTextInputVisible, setIsTextInputVisible] = useState(false);
    const [textInputPosition, setTextInputPosition] = useState({ x: 0, y: 0 });
    const [textValue, setTextValue] = useState('');

    const selectTool = (tool) => {
        if (isDrawing) {
            setIsDrawing(false);
            setCurrentDrawingShape(null);
        }
        setCurrentTool(tool);
    };

    const handleDrawCircle = () => selectTool('circle');
    const handleDrawTriangle = () => selectTool('triangle');
    const handleDrawSquare = () => selectTool('square');
    const handleDrawRectangle = () => selectTool('rectangle');
    const handleDrawEllipse = () => selectTool('ellipse');
    const handleDrawLine = () => selectTool('line');
    const handleDrawText = () => selectTool('text');
    const startDrawingFreehand = () => selectTool('freehand');

    const cancelDrawing = () => {
        if (isDrawing) {
            setIsDrawing(false);
            setCurrentDrawingShape(null);
            setCurrentTool(null);
        }
    };

    const handleMouseDown = (e) => {
        const { offsetX, offsetY, button } = e.nativeEvent;
        if (button !== 0) return;
        if (currentTool) {
            if (currentTool === 'text') {
                setIsTextInputVisible(true);
                setTextInputPosition({ x: offsetX, y: offsetY });
                return;
            }
            setIsDrawing(true);
            startPoint.current = { x: offsetX, y: offsetY };
            let tempShape = { type: currentTool };
            switch (currentTool) {
                case 'circle':
                    tempShape = { type: 'circle', x: offsetX, y: offsetY, radius: 0 };
                    break;
                case 'triangle':
                    tempShape = { type: 'triangle', x: offsetX, y: offsetY, radius: 0 };
                    break;
                case 'square':
                    tempShape = { type: 'square', x: offsetX, y: offsetY, sideLength: 0 };
                    break;
                case 'rectangle':
                    tempShape = { type: 'rectangle', x: offsetX, y: offsetY, width: 0, height: 0 };
                    break;
                case 'ellipse':
                    tempShape = { type: 'ellipse', x: offsetX, y: offsetY, radiusX: 0, radiusY: 0 };
                    break;
                case 'line':
                    tempShape = { type: 'line', x1: offsetX, y1: offsetY, x2: offsetX, y2: offsetY };
                    break;
                case 'freehand':
                    tempShape = { type: 'freehand', points: [{ x: offsetX, y: offsetY }] };
                    break;
                default:
                    break;
            }
            setCurrentDrawingShape(tempShape);
        } else {
            const index = shapeModelRef.current.findShapeAtPosition(offsetX, offsetY);
            if (index !== -1) {
                setIsDragging(true);
                setDraggingIndex(index);
                const shape = shapeModelRef.current.shapes[index];
                dragStart.current = { x: offsetX - shape.x, y: offsetY - shape.y };
            }
        }
    };

    const handleMouseMove = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        if (isDrawing && currentDrawingShape) {
            if (currentTool === 'text') {
                return;
            }
            const dx = offsetX - startPoint.current.x;
            const dy = offsetY - startPoint.current.y;
            let updatedShape = { ...currentDrawingShape };
            switch (currentTool) {
                case 'circle':
                case 'triangle':
                    updatedShape.radius = Math.sqrt(dx * dx + dy * dy);
                    break;
                case 'square':
                    updatedShape.sideLength = Math.max(Math.abs(dx), Math.abs(dy));
                    updatedShape.x = startPoint.current.x + (dx < 0 ? -updatedShape.sideLength / 2 : updatedShape.sideLength / 2);
                    updatedShape.y = startPoint.current.y + (dy < 0 ? -updatedShape.sideLength / 2 : updatedShape.sideLength / 2);
                    break;
                case 'rectangle':
                    updatedShape.width = Math.abs(dx);
                    updatedShape.height = Math.abs(dy);
                    updatedShape.x = startPoint.current.x + dx / 2;
                    updatedShape.y = startPoint.current.y + dy / 2;
                    break;
                case 'ellipse':
                    updatedShape.radiusX = Math.abs(dx);
                    updatedShape.radiusY = Math.abs(dy);
                    break;
                case 'line':
                    updatedShape.x2 = offsetX;
                    updatedShape.y2 = offsetY;
                    break;
                case 'freehand':
                    updatedShape.points = [...updatedShape.points, { x: offsetX, y: offsetY }];
                    break;
                default:
                    break;
            }

            setCurrentDrawingShape(updatedShape);
        } else if (isDragging && draggingIndex !== null) {
            const shape = shapeModelRef.current.shapes[draggingIndex];
            let newShape;

            switch (shape.type) {
                case 'circle':
                case 'triangle':
                case 'square':
                case 'rectangle':
                case 'ellipse':
                    newShape = { ...shape, x: offsetX - dragStart.current.x, y: offsetY - dragStart.current.y };
                    break;
                case 'line':
                    const deltaX = offsetX - dragStart.current.x;
                    const deltaY = offsetY - dragStart.current.y;
                    newShape = { ...shape, x1: deltaX, y1: deltaY, x2: deltaX + (shape.x2 - shape.x1), y2: deltaY + (shape.y2 - shape.y1) };
                    break;
                case 'text':
                    newShape = { ...shape, x: offsetX - dragStart.current.x, y: offsetY - dragStart.current.y };
                    break;
                default:
                    newShape = shape;
            }

            shapeModelRef.current.updateShape(draggingIndex, newShape);
            setShapes([...shapeModelRef.current.getShapes()]);
        }
    };


    const handleMouseUp = () => {
        if (isDrawing && currentDrawingShape) {
            if (currentTool === 'text') {
                return;
            }
            shapeModelRef.current.addShape(currentDrawingShape);
            setShapes([...shapeModelRef.current.getShapes()]);
            setIsDrawing(false);
            setCurrentTool(null);
            setCurrentDrawingShape(null);
        } else if (isDragging) {
            setIsDragging(false);
            setDraggingIndex(null);
        }
    };

    const handleRightClick = (e) => {
        e.preventDefault();
        const { offsetX, offsetY } = e.nativeEvent;
        const index = shapeModelRef.current.findShapeAtPosition(offsetX, offsetY);
        if (index !== -1) {
            shapeModelRef.current.removeShape(index);
            setShapes([...shapeModelRef.current.getShapes()]);
        }
    };

    const handleWheel = (e) => {
        const { offsetX, offsetY, deltaY } = e.nativeEvent;
        const index = shapeModelRef.current.findShapeAtPosition(offsetX, offsetY);
        if (index !== -1) {
            const shape = shapeModelRef.current.shapes[index];
            let updatedShape = { ...shape };
            const scaleFactor = 1 - deltaY * 0.001;
            switch (shape.type) {
                case 'circle':
                    updatedShape.radius *= scaleFactor;
                    if (updatedShape.radius < 10) updatedShape.radius = 10;
                    break;
                case 'triangle':
                    updatedShape.radius *= scaleFactor;
                    if (updatedShape.radius < 10) updatedShape.radius = 10;
                    break;
                case 'square':
                    updatedShape.sideLength *= scaleFactor;
                    if (updatedShape.sideLength < 10) updatedShape.sideLength = 10;
                    break;
                case 'rectangle':
                    updatedShape.width *= scaleFactor;
                    updatedShape.height *= scaleFactor;
                    if (updatedShape.width < 10) updatedShape.width = 10;
                    if (updatedShape.height < 10) updatedShape.height = 10;
                    break;
                case 'ellipse':
                    updatedShape.radiusX *= scaleFactor;
                    updatedShape.radiusY *= scaleFactor;
                    if (updatedShape.radiusX < 10) updatedShape.radiusX = 10;
                    if (updatedShape.radiusY < 10) updatedShape.radiusY = 10;
                    break;
                case 'line':
                    updatedShape.x2 = updatedShape.x1 + (shape.x2 - shape.x1) * scaleFactor;
                    updatedShape.y2 = updatedShape.y1 + (shape.y2 - shape.y1) * scaleFactor;
                    break;
                case 'text':
                    updatedShape.fontSize = Math.max((updatedShape.fontSize || 16) * scaleFactor, 10);
                    break;
                default:
                    break;
            }
            shapeModelRef.current.updateShape(index, updatedShape);
            setShapes([...shapeModelRef.current.getShapes()]);
        }
    };

    const handleTextSubmit = () => {
        if (textValue.trim() === '') {
            setIsTextInputVisible(false);
            setTextValue('');
            return;
        }
        const newTextShape = {
            type: 'text',
            x: textInputPosition.x,
            y: textInputPosition.y,
            text: textValue,
            fontSize: 16,
            fontFamily: 'Arial',
            color: 'black',
            width: 0,
            height: 0,
        };
        shapeModelRef.current.addShape(newTextShape);
        setShapes([...shapeModelRef.current.getShapes()]);
        setIsTextInputVisible(false);
        setTextValue('');
    };

    const handleTextChange = (e) => {
        setTextValue(e.target.value);
    };

    const handleTextKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleTextSubmit();
        }
    };

    return {
        shapes,
        currentDrawingShape,
        handleDrawCircle,
        handleDrawTriangle,
        handleDrawSquare,
        handleDrawRectangle,
        handleDrawEllipse,
        handleDrawLine,
        handleDrawText,
        startDrawingFreehand,
        cancelDrawing,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleRightClick,
        handleWheel,
        isTextInputVisible,
        textInputPosition,
        textValue,
        handleTextChange,
        handleTextSubmit,
        handleTextKeyDown,
    };
};
