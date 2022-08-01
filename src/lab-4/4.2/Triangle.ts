import {SolidShape} from './SolidShape'
import {Point} from './Point'
import {CustomCanvas} from './CustomCanvas'

export class Triangle implements SolidShape{
    private readonly vertex1: Point
    private readonly vertex2: Point
    private readonly vertex3: Point
    private readonly outlineColor: string
    private readonly fillColor: string

    constructor(vertex1: Point, vertex2: Point, vertex3: Point, outlineColor: string, fillColor: string = '000000') {
        this.vertex1 = vertex1
        this.vertex2 = vertex2
        this.vertex3 = vertex3
        this.outlineColor = outlineColor
        this.fillColor = fillColor
    }

    public draw(canvas: CustomCanvas): void {
        canvas.setStrokeColor(this.outlineColor)
        canvas.setFillColor(this.fillColor)

        const points: Point[] = [this.vertex1, this.vertex2, this.vertex3]
        canvas.drawPolygon(points)
    }

    public getArea(): number {
        const coordinateDifferenceX21 = (this.vertex2.x - this.vertex1.x)
        const coordinateDifferenceY31 = (this.vertex3.y - this.vertex1.y)
        const coordinateDifferenceX31 = (this.vertex3.x - this.vertex1.x)
        const coordinateDifferenceY21 = (this.vertex2.y - this.vertex1.y)
        return Math.abs(coordinateDifferenceX21 * coordinateDifferenceY31 - coordinateDifferenceX31 * coordinateDifferenceY21) / 2
    }

    public getFillColor(): string {
        return this.fillColor
    }

    public getOutlineColor(): string {
        return this.outlineColor
    }

    public getPerimeter(): number {
        const side12length: number = Math.sqrt((this.vertex1.x - this.vertex2.x) ** 2 + (this.vertex1.y - this.vertex2.y) ** 2)
        const side23length: number = Math.sqrt((this.vertex2.x - this.vertex3.x) ** 2 + (this.vertex2.y - this.vertex3.y) ** 2)
        const side31length: number = Math.sqrt((this.vertex3.x - this.vertex1.x) ** 2 + (this.vertex3.y - this.vertex1.y) ** 2)

        return side12length + side23length + side31length
    }

    public toString(): string {
        return 'triangle\n' +
            `vertex1: (${this.vertex1.x},${this.vertex1.y})\n` +
            `vertex2: (${this.vertex2.x},${this.vertex2.y})\n` +
            `vertex3: (${this.vertex3.x},${this.vertex3.y})\n` +
            `area: ${this.getArea()}\n` +
            `perimeter: ${this.getPerimeter()}\n` +
            `outline color: ${this.outlineColor}\n` +
            `fill color: ${this.fillColor}`
    }
}