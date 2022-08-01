import {Canvas, CanvasRenderingContext2D, createCanvas} from 'canvas'
import {CanvasInterface} from './CanvasInterface'
import {Point} from './Point'

export class CustomCanvas implements CanvasInterface {
    private width = 1200
    private height = 600
    private lineWidth = 2
    private canvas: Canvas
    private context: CanvasRenderingContext2D

    constructor() {
        this.canvas = createCanvas(this.width, this.height)
        this.context = this.canvas.getContext('2d')
        this.context.lineWidth = this.lineWidth
    }

    public drawCircle(center: Point, radius: number): void {
        this.context.beginPath()
        this.context.arc(center.x, center.y, radius, 0, Math.PI * 2)
        this.context.fill()
        this.context.stroke()
    }

    public drawLine(from: Point, to: Point): void {
        this.context.beginPath()
        this.context.moveTo(from.x, from.y)
        this.context.lineTo(to.x, to.y)
        this.context.stroke()
    }

    public drawRectangle(point: Point, width: number, height: number): void {
        this.context.fillRect(point.x, point.y, width, height)
        this.context.strokeRect(point.x, point.y, width, height)
    }

    public drawPolygon(points: Point[]): void {
        this.context.beginPath()
        points.map((point: Point, index: number) => {
            if (index === 0) {
                this.context.moveTo(point.x, point.y)
                return
            }
            this.context.lineTo(point.x, point.y)
        })
        this.context.closePath()
        this.context.fill()
        this.context.stroke()
    }

    public setFillColor(fillColor: string): void {
        this.context.fillStyle = `#${fillColor}`
    }

    public setStrokeColor(outlineColor: string): void {
        this.context.strokeStyle = `#${outlineColor}`
    }
}