import {Shape} from './Shape'
import {ShapeFactory} from './ShapeFactory'

export enum ShapeNamesTypes {
    RECTANGLE = 'rectangle',
    TRIANGLE = 'triangle',
    CIRCLE = 'circle',
    LINE_SEGMENT = 'line',
}

export class ShapeHandler {
    shapeArray: Shape[] = []

    public addShape(line: string): void {
        this.shapeArray.push(ShapeFactory.createShape(line))
    }

    public getMaxAreaShape(): string {
        const sortableShapeArray: Shape[] = this.shapeArray.slice()
        const maxAreaShape: Shape | undefined = sortableShapeArray
            .sort((a: Shape, b: Shape) => b.getArea() - a.getArea())[0]
        return maxAreaShape.toString()
    }

    public getMinPerimeterShape(): string {
        const sortableShapeArray: Shape[] = this.shapeArray.slice()
        const minPerimeterShape: Shape | undefined = sortableShapeArray
            .sort((a: Shape, b: Shape) => a.getPerimeter() - b.getPerimeter())[0]
        return minPerimeterShape.toString()
    }
}