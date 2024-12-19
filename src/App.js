import React from 'react';
import { useShapeController } from "./Controllers/ShapeController";
import ShapeView from "./Views/ShapeView";
import './Style/ShapeStyle.css';
import { useCubeController } from "./Controllers/CubeController";
import CubeView from "./Views/CubeView";
import { useConeController } from "./Controllers/ConeController";
import ConeView from "./Views/ConeView";
import FormatView from './Views/FormatView';
import ImageView from "./Views/ImageView";
import BezierView from "./Views/BezierView";
import BezierCurveView from "./Views/BezierView";
import ImageView2 from "./Views/ImageView2";

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
            <h1>Ćwiczenie 3 — Formaty plików, format PPM</h1>
            <FormatView/>
            <h1>Ćwiczenie 4 — Przekształcanie obrazów</h1>
            <ImageView/>
            <h4>Najlepiej zadziała filtr Gaussa</h4>
            <h5>Aby wykonać testy należy w katalogu "zadanie" wpisać: npm test</h5>
            <h1>Ćwiczenie 5 - Filtry morfologiczne i histogram</h1>
            <ImageView2/>
            <h1>Ćwiczenie 6 — Krzywa Béziera</h1>
            <BezierCurveView/>
            <h4>Część zadania z przekształcaniem mam zaimplementowany w zadaniu 1. Proszę sprawdzić</h4>
        </div>
    );
};

export default App;
