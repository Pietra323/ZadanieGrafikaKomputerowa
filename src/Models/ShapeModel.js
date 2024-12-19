export class ShapeModel {
    constructor() {
        this.shapes = [];
    }

    addShape(shape) {
        this.shapes.push(shape);
    }

    getShapes() {
        return this.shapes;
    }

    updateShape(index, newShape) {
        if (index >= 0 && index < this.shapes.length) {
            this.shapes[index] = newShape;
        }
    }

    removeShape(index) {
        if (index >= 0 && index < this.shapes.length) {
            this.shapes.splice(index, 1);
        }
    }

    findShapeAtPosition(x, y) {
        for (let i = this.shapes.length - 1; i >= 0; i--) {
            const shape = this.shapes[i];
            switch(shape.type) {
                case 'circle':
                    if (this.isPointInCircle(x, y, shape)) return i;
                    break;
                case 'triangle':
                    if (this.isPointInTriangle(x, y, shape)) return i;
                    break;
                case 'square':
                    if (this.isPointInSquare(x, y, shape)) return i;
                    break;
                case 'rectangle':
                    if (this.isPointInRectangle(x, y, shape)) return i;
                    break;
                case 'ellipse':
                    if (this.isPointInEllipse(x, y, shape)) return i;
                    break;
                case 'line':
                    if (this.isPointInLine(x, y, shape)) return i;
                    break;
                case 'freehand':
                    if (this.isPointInFreehand(x, y, shape)) return i;
                    break;
                case 'text':
                    if (this.isPointInText(x, y, shape)) return i;
                    break;
                default:
                    break;
            }
        }
        return -1;
    }

    isPointInCircle(x, y, shape) {
        const distance = Math.sqrt((x - shape.x) ** 2 + (y - shape.y) ** 2);
        return distance <= shape.radius;
    }

    isPointInTriangle(x, y, shape) {
        const height = shape.radius * Math.sqrt(3);
        const x1 = shape.x;
        const y1 = shape.y - (2 / 3) * height;
        const x2 = shape.x - shape.radius;
        const y2 = shape.y + (1 / 3) * height;
        const x3 = shape.x + shape.radius;
        const y3 = shape.y + (1 / 3) * height;

        return this.pointInTriangle(x, y, x1, y1, x2, y2, x3, y3);
    }

    isPointInSquare(x, y, shape) {
        const halfSide = shape.sideLength / 2;
        return (
            x >= shape.x - halfSide &&
            x <= shape.x + halfSide &&
            y >= shape.y - halfSide &&
            y <= shape.y + halfSide
        );
    }

    isPointInRectangle(x, y, shape) {
        const halfWidth = shape.width / 2;
        const halfHeight = shape.height / 2;
        return (
            x >= shape.x - halfWidth &&
            x <= shape.x + halfWidth &&
            y >= shape.y - halfHeight &&
            y <= shape.y + halfHeight
        );
    }

    isPointInEllipse(x, y, shape) {
        const dx = x - shape.x;
        const dy = y - shape.y;
        return ((dx ** 2) / (shape.radiusX ** 2) + (dy ** 2) / (shape.radiusY ** 2)) <= 1;
    }

    isPointInLine(x, y, shape) {
        const { x1, y1, x2, y2 } = shape;
        const distance = this.pointToLineDistance(x, y, x1, y1, x2, y2);
        return distance <= 5;
    }

    isPointInFreehand(x, y, shape) {
        return shape.points.some(point => {
            const distance = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
            return distance <= 5;
        });
    }

    isPointInText(x, y, shape) {
        const { x: textX, y: textY, width, height } = shape;
        return (
            x >= textX &&
            x <= textX + width &&
            y >= textY - height &&
            y <= textY
        );
    }

    pointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
        const denominator = ((y2 - y3)*(x1 - x3) + (x3 - x2)*(y1 - y3));
        const a = ((y2 - y3)*(px - x3) + (x3 - x2)*(py - y3)) / denominator;
        const b = ((y3 - y1)*(px - x3) + (x1 - x3)*(py - y3)) / denominator;
        const c = 1 - a - b;
        return (a >= 0) && (a <= 1) && (b >= 0) && (b <= 1) && (c >= 0) && (c <= 1);
    }

    pointToLineDistance(px, py, x1, y1, x2, y2) {
        const A = px - x1;
        const B = py - y1;
        const C = x2 - x1;
        const D = y2 - y1;

        const dot = A * C + B * D;
        const len_sq = C * C + D * D;
        let param = -1;
        if (len_sq !== 0) param = dot / len_sq;

        let xx, yy;

        if (param < 0) {
            xx = x1;
            yy = y1;
        }
        else if (param > 1) {
            xx = x2;
            yy = y2;
        }
        else {
            xx = x1 + param * C;
            yy = y1 + param * D;
        }

        const dx = px - xx;
        const dy = py - yy;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
