import React, { useEffect, useRef, useState } from 'react';
import { useBezierCurveController } from "../Controllers/BezierController";

const BezierCurveView = () => {
    const { addPoint, updatePoint, getCurvePoints, points } = useBezierCurveController();
    const [isDrawing, setIsDrawing] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [draggedPointIndex, setDraggedPointIndex] = useState(null);
    const canvasRef = useRef(null);

    const handleMouseDown = (e) => {
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        const pointIndex = points.findIndex(point => {
            const distance = Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2);
            return distance < 10;
        });

        if (pointIndex !== -1) {
            setIsDragging(true);
            setDraggedPointIndex(pointIndex);
        } else {
            setIsDrawing(true);
            addPoint(x, y);
        }
    };

    const handleMouseMove = (e) => {
        if (isDrawing) {
            const x = e.nativeEvent.offsetX;
            const y = e.nativeEvent.offsetY;
            updatePoint(points.length - 1, x, y);
        }

        if (isDragging && draggedPointIndex !== null) {
            const x = e.nativeEvent.offsetX;
            const y = e.nativeEvent.offsetY;
            updatePoint(draggedPointIndex, x, y);
        }
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        setIsDragging(false);
        setDraggedPointIndex(null);
    };

    const drawBezierCurve = (context) => {
        if (points.length < 2) return;

        function bezier(t, points) {
            const newPoints = [];
            for (let i = 0; i < points.length - 1; i++) {
                const x = (1 - t) * points[i].x + t * points[i + 1].x;
                const y = (1 - t) * points[i].y + t * points[i + 1].y;
                newPoints.push({ x, y });
            }
            if (newPoints.length > 1) {
                return bezier(t, newPoints);
            }
            return newPoints[0];
        }

        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        for (let t = 0; t <= 1; t += 0.01) {
            const point = bezier(t, points);
            context.lineTo(point.x, point.y);
        }
        context.stroke();
    };

    const drawPoints = (context) => {
        context.fillStyle = 'red';
        points.forEach(point => {
            context.beginPath();
            context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            context.fill();
        });
    };

    useEffect(() => {
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        drawBezierCurve(context);
        drawPoints(context);
    }, [points]);

    return (
        <div>
            <h2>Rysowanie Krzywej Béziera</h2>
            <canvas
                ref={canvasRef}
                width="800"
                height="600"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                style={{ border: '1px solid black' }}
            />
        </div>
    );
};

export default BezierCurveView;
