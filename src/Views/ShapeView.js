import React, { useEffect, useRef } from 'react';

const ShapeView = ({
                       shapes,
                       currentDrawingShape,
                       onDrawCircle,
                       onDrawTriangle,
                       onDrawSquare,
                       onDrawRectangle,
                       onDrawEllipse,
                       onDrawLine,
                       onDrawText,
                       startDrawingFreehand,
                       cancelDrawing,
                       onMouseDown,
                       onMouseMove,
                       onMouseUp,
                       onRightClick,
                       onWheel,
                       isTextInputVisible,
                       textInputPosition,
                       textValue,
                       handleTextChange,
                       handleTextSubmit,
                       handleTextKeyDown,
                   }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        shapes.forEach((shape) => {
            switch(shape.type) {
                case 'circle':
                    drawCircle(context, shape);
                    break;
                case 'triangle':
                    drawTriangle(context, shape);
                    break;
                case 'square':
                    drawSquare(context, shape);
                    break;
                case 'rectangle':
                    drawRectangle(context, shape);
                    break;
                case 'ellipse':
                    drawEllipse(context, shape);
                    break;
                case 'line':
                    drawLine(context, shape);
                    break;
                case 'freehand':
                    drawFreehand(context, shape);
                    break;
                case 'text':
                    drawText(context, shape);
                    break;
                default:
                    break;
            }
        });

        if (currentDrawingShape) {
            switch(currentDrawingShape.type) {
                case 'circle':
                    drawCircle(context, currentDrawingShape, true);
                    break;
                case 'triangle':
                    drawTriangle(context, currentDrawingShape, true);
                    break;
                case 'square':
                    drawSquare(context, currentDrawingShape, true);
                    break;
                case 'rectangle':
                    drawRectangle(context, currentDrawingShape, true);
                    break;
                case 'ellipse':
                    drawEllipse(context, currentDrawingShape, true);
                    break;
                case 'line':
                    drawLine(context, currentDrawingShape, true);
                    break;
                case 'freehand':
                    drawFreehand(context, currentDrawingShape, true);
                    break;
                default:
                    break;
            }
        }
    }, [shapes, currentDrawingShape]);

    const drawCircle = (context, shape, isTemporary = false) => {
        context.beginPath();
        context.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
        context.strokeStyle = isTemporary ? 'rgba(0,0,255,0.5)' : 'black';
        context.lineWidth = isTemporary ? 2 : 1;
        context.stroke();
    };

    const drawTriangle = (context, shape, isTemporary = false) => {
        const height = shape.radius * Math.sqrt(3);
        context.beginPath();
        context.moveTo(shape.x, shape.y - (2 / 3) * height);
        context.lineTo(shape.x - shape.radius, shape.y + (1 / 3) * height);
        context.lineTo(shape.x + shape.radius, shape.y + (1 / 3) * height);
        context.closePath();
        context.strokeStyle = isTemporary ? 'rgba(0,0,255,0.5)' : 'black';
        context.lineWidth = isTemporary ? 2 : 1;
        context.stroke();
    };

    const drawSquare = (context, shape, isTemporary = false) => {
        const halfSide = shape.sideLength / 2;
        context.beginPath();
        context.rect(shape.x - halfSide, shape.y - halfSide, shape.sideLength, shape.sideLength);
        context.strokeStyle = isTemporary ? 'rgba(0,0,255,0.5)' : 'black';
        context.lineWidth = isTemporary ? 2 : 1;
        context.stroke();
    };

    const drawRectangle = (context, shape, isTemporary = false) => {
        const halfWidth = shape.width / 2;
        const halfHeight = shape.height / 2;
        context.beginPath();
        context.rect(shape.x - halfWidth, shape.y - halfHeight, shape.width, shape.height);
        context.strokeStyle = isTemporary ? 'rgba(0,0,255,0.5)' : 'black';
        context.lineWidth = isTemporary ? 2 : 1;
        context.stroke();
    };

    const drawEllipse = (context, shape, isTemporary = false) => {
        context.beginPath();
        context.ellipse(shape.x, shape.y, shape.radiusX, shape.radiusY, 0, 0, 2 * Math.PI);
        context.strokeStyle = isTemporary ? 'rgba(0,0,255,0.5)' : 'black';
        context.lineWidth = isTemporary ? 2 : 1;
        context.stroke();
    };

    const drawLine = (context, shape, isTemporary = false) => {
        context.beginPath();
        context.moveTo(shape.x1, shape.y1);
        context.lineTo(shape.x2, shape.y2);
        context.strokeStyle = isTemporary ? 'rgba(0,0,255,0.5)' : 'black';
        context.lineWidth = isTemporary ? 2 : 1;
        context.stroke();
    };

    const drawFreehand = (context, shape, isTemporary = false) => {
        if (shape.points.length === 0) return;
        context.beginPath();
        context.moveTo(shape.points[0].x, shape.points[0].y);
        for (let i = 1; i < shape.points.length; i++) {
            context.lineTo(shape.points[i].x, shape.points[i].y);
        }
        context.strokeStyle = isTemporary ? 'rgba(0,0,255,0.5)' : 'black';
        context.lineWidth = isTemporary ? 2 : 1;
        context.stroke();
    };

    const drawText = (context, shape) => {
        context.font = `${shape.fontSize || 16}px ${shape.fontFamily || 'Arial'}`;
        context.fillStyle = shape.color || 'black';
        context.textBaseline = 'top';
        context.fillText(shape.text, shape.x, shape.y);
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'moj-obraz.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div style={{position: 'relative'}}>
            <div style={{marginBottom: '10px'}} className="button-container">
                <button className="button-28" onClick={onDrawCircle}>Dodaj Kółko</button>
                <button className="button-28" onClick={onDrawTriangle}>Dodaj Trójkąt</button>
                <button className="button-28" onClick={onDrawSquare}>Dodaj Kwadrat</button>
                <button className="button-28" onClick={onDrawRectangle}>Dodaj Prostokąt</button>
                <button className="button-28" onClick={onDrawEllipse}>Dodaj Elipsę</button>
                <button className="button-28" onClick={onDrawLine}>Dodaj Linię</button>
                <button className="button-28" onClick={onDrawText}>Dodaj Tekst</button>
                <button className="button-28" onClick={startDrawingFreehand}>Rysuj Odręcznie</button>
                <button className="button-28" onClick={cancelDrawing}>Zakończ Rysowanie</button>
                <button className="button-28" onClick={handleDownload}>Zapisz obraz</button>
            </div>

            <canvas
                ref={canvasRef}
                width={1200}
                height={600}
                style={{border: '3px solid black', cursor: 'crosshair'}}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onContextMenu={onRightClick}
                onWheel={onWheel}
            ></canvas>
            {isTextInputVisible && (
                <div
                    style={{
                        position: 'absolute',
                        left: textInputPosition.x + 10,
                        top: textInputPosition.y + 10,
                        backgroundColor: 'white',
                        border: '1px solid black',
                        padding: '5px',
                        zIndex: 10,
                    }}
                >
                    <input
                        type="text"
                        value={textValue}
                        onChange={handleTextChange}
                        onKeyDown={handleTextKeyDown}
                        autoFocus
                        placeholder="Wpisz tekst..."
                        style={{outline: 'none'}}
                    />
                    <button onClick={handleTextSubmit}>OK</button>
                </div>
            )}
        </div>
    );
};

export default ShapeView;
