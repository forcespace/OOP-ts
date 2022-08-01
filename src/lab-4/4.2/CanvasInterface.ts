import {Point} from './Point'

export interface CanvasInterface {
    setFillColor(fillColor: string): void
    setStrokeColor(outlineColor: string): void
    drawLine(from: Point, to: Point): void
    drawRectangle(point: Point, width: number, height: number): void
    drawPolygon(points: Point[]): void
    drawCircle(center:Point, radius: number): void
}