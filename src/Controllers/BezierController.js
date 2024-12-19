import { useState } from "react";
import { BezierCurveModel } from "../Models/BezierModel";

const BezierCurveInstance = new BezierCurveModel();

export const useBezierCurveController = () => {
    const [points, setPoints] = useState(BezierCurveInstance.points);

    const addPoint = (x, y) => {
        const newPoints = [...points, { x, y }];
        BezierCurveInstance.setPoints(newPoints);
        setPoints(newPoints);
    };

    const removePoint = (index) => {
        const newPoints = points.filter((_, i) => i !== index);
        BezierCurveInstance.setPoints(newPoints);
        setPoints(newPoints);
    };

    const updatePoint = (index, x, y) => {
        const newPoints = [...points];
        newPoints[index] = { x, y };
        BezierCurveInstance.setPoints(newPoints);
        setPoints(newPoints);
    };

    const changeDegree = (degree) => {
        BezierCurveInstance.setDegree(degree);
    };

    const getCurvePoints = () => {
        return BezierCurveInstance.getCurvePoints();
    };

    return {
        addPoint,
        removePoint,
        updatePoint,
        changeDegree,
        getCurvePoints,
        points,
    };
};
