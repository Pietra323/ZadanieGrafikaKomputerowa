export class BezierCurveModel {
    constructor() {
        this.points = [];
    }

    addPoint(x, y) {
        this.points.push({ x, y });
    }

    setPoints(points) {
        this.points = points;
    }

    getCurvePoints() {
        if (this.points.length < 2) {
            return [];
        }

        const curvePoints = [];
        for (let t = 0; t <= 1; t += 0.01) {
            const x = (1 - t) * this.points[0].x + t * this.points[1].x;
            const y = (1 - t) * this.points[0].y + t * this.points[1].y;
            curvePoints.push({ x, y });
        }
        return curvePoints;
    }
}

export default BezierCurveModel;
