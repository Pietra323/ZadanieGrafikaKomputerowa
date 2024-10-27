import React from 'react';
import {useShapeController} from "./Controllers/ShapeController";
import ShapeView from "./Views/ShapeView";
import './Style/ShapeStyle.css';
import {useCubeController} from "./Controllers/CubeController";
import CubeView from "./Views/CubeView";
import {useConeController} from "./Controllers/ConeController";
import ConeView from "./Views/ConeView";


const App = () => {
    const { rotation: cubeRotation, faces } = useCubeController();
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
            <h1>Ćwiczenie 2 — Przestrzenie barw</h1>
            <div id="cube-and-cone" style={{display: 'flex', width: '50%', flexDirection: 'row'}}>
                <div id="cube" style={{flex: 1}}>
                    <CubeView/>
                </div>
                <div id="cone" style={{flex: 1}}>
                    <ConeView/>
                </div>
            </div>

        </div>
    );
};

export default App;