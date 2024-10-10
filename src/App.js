// src/App.js
import React from 'react';
import {useShapeController} from "./Controllers/ShapeController";
import ShapeView from "./Views/ShapeView";
import './Style/ShapeStyle.css';


const App = () => {
    const {
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
    } = useShapeController();

    return (
        <div>
            <h1>Ćwiczenie 1 — Podstawy aplikacji graficznych</h1>
            <ShapeView
                shapes={shapes}
                currentDrawingShape={currentDrawingShape}
                onDrawCircle={handleDrawCircle}
                onDrawTriangle={handleDrawTriangle}
                onDrawSquare={handleDrawSquare}
                onDrawRectangle={handleDrawRectangle}
                onDrawEllipse={handleDrawEllipse}
                onDrawLine={handleDrawLine}
                onDrawText={handleDrawText}
                startDrawingFreehand={startDrawingFreehand}
                cancelDrawing={cancelDrawing}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onRightClick={handleRightClick}
                onWheel={handleWheel}
                isTextInputVisible={isTextInputVisible}
                textInputPosition={textInputPosition}
                textValue={textValue}
                handleTextChange={handleTextChange}
                handleTextSubmit={handleTextSubmit}
                handleTextKeyDown={handleTextKeyDown}
            />
        </div>
    );
};

export default App;
