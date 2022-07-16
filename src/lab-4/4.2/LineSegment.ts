import {Point} from './Point'
import {Shape} from './Shape'
import {CustomCanvas} from './CustomCanvas'

class LineSegment implements Shape {
    /*protected лучше использовать там где требует доступ в наследниках*/
    private readonly startPoint: Point
    private readonly endPoint: Point
    private readonly outlineColor: string

    constructor(startPoint: Point, endPoint: Point, outlineColor: string) {
        this.startPoint = startPoint
        this.endPoint = endPoint
        this.outlineColor = outlineColor
    }

    public getArea(): number {
        return 0
    }

    public getOutlineColor(): string {
        return this.outlineColor
    }

    public getPerimeter(): number {
        return Math.sqrt((this.startPoint.x - this.endPoint.x) ** 2 + (this.startPoint.y - this.endPoint.y) ** 2)
    }

    public toString(): string {
        return `line segment\nstart point: (${this.startPoint.x},${this.startPoint.y})\nend point: (${this.endPoint.x},${this.endPoint.y})\nperimeter: ${this.getPerimeter()}\noutline color: ${this.outlineColor}`
    }

    public draw(canvas: CustomCanvas): void {
        canvas.setStrokeColor(this.outlineColor)
        canvas.drawLine(this.startPoint, this.endPoint)
    }
}

export {
    LineSegment,
}