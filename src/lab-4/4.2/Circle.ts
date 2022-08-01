import {SolidShape} from './SolidShape'
import {Point} from './Point'
import {CanvasInterface} from './CanvasInterface'

export class Circle implements SolidShape {
    private readonly center: Point
    private readonly radius: number
    private readonly fillColor: string
    private readonly outlineColor: string

    constructor(
        center: Point,
        radius: number,
        outlineColor: string,
        fillColor: string = '000000'
    ) {
        this.center = center
        this.radius = radius
        this.fillColor = fillColor
        this.outlineColor = outlineColor
    }

    public getArea(): number {
        return Math.PI * this.radius ** 2
    }

    public getFillColor(): string {
        return this.fillColor
    }

    public getOutlineColor(): string {
        return this.outlineColor
    }

    public getPerimeter(): number {
        return Math.PI * 2 * this.radius
    }

    public toString(): string {
        return 'circle\n' +
            `center: (${this.center.x},${this.center.y})\n` +
            `radius: ${this.radius}\n` +
            `area: ${this.getArea()}\n` +
            `perimeter: ${this.getPerimeter()}\n` +
            `outline color: ${this.outlineColor}\n` +
            `fill color: ${this.fillColor}`
    }

    public draw(canvas: CanvasInterface): void {
        canvas.setStrokeColor(this.outlineColor)
        canvas.setFillColor(this.fillColor)
        canvas.drawCircle(this.center, this.radius)
    }
}