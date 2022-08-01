import {Point} from './Point'
import {SolidShape} from './SolidShape'
import {CustomCanvas} from './CustomCanvas'

export class Rectangle implements SolidShape {
    private readonly leftTop: Point
    private readonly rightBottom: Point
    private readonly height: number
    private readonly width: number
    private readonly outlineColor: string
    private readonly fillColor: string

    constructor(leftTop: Point, width: number, height: number, outlineColor: string, fillColor: string = '000000') {
        this.leftTop = leftTop
        this.rightBottom = {
            x: leftTop.x + width,
            y: leftTop.y + height,
        }
        this.height = height
        this.width = width
        this.outlineColor = outlineColor
        this.fillColor = fillColor
    }

    public getFillColor(): string {
        return this.fillColor
    }

    public getArea(): number {
        return this.height * this.width
    }

    public getHeight(): number {
        return this.height
    }

    public getOutlineColor(): string {
        return this.outlineColor
    }

    public getPerimeter(): number {
        return (this.height + this.width) * 2
    }

    public getWidth(): number {
        return this.width
    }

    public toString(): string {
        return 'rectangle\n' +
            `left top point: (${this.leftTop.x},${this.leftTop.y})\n` +
            `width: ${this.width}\n` +
            `height: ${this.height}\n` +
            `area: ${this.getArea()}\n` +
            `perimeter: ${this.getPerimeter()}\n` +
            `outline color: ${this.outlineColor}\n` +
            `fill color: ${this.fillColor}`
    }

    public draw(canvas: CustomCanvas): void {
        canvas.setStrokeColor(this.outlineColor)
        canvas.setFillColor(this.fillColor)
        canvas.drawRectangle(this.leftTop, this.width, this.height)
    }
}