import {Shape} from './Shape'
import {Point} from './Point'
import {Rectangle} from './Rectangle'
import {Triangle} from './Triangle'
import {Circle} from './Circle'
import {LineSegment} from './LineSegment'
import {ShapeNamesTypes} from './ShapeHandler'

const ERROR_WRONG_TYPE = 'Wrong shape type'

export class ShapeFactory {
    public static createShape(line: string): Shape {
        const lineArray: string[] = line.split(' ')
        switch (lineArray[0]) {
            case ShapeNamesTypes.RECTANGLE: {
                return ShapeFactory.createRectangle(lineArray)
            }
            case ShapeNamesTypes.TRIANGLE: {
                return ShapeFactory.createTriangle(lineArray)
            }
            case ShapeNamesTypes.CIRCLE: {
                return ShapeFactory.createCircle(lineArray)
            }
            case ShapeNamesTypes.LINE_SEGMENT: {
                return ShapeFactory.createLineSegment(lineArray)
            }
            default: {
                throw new Error(ERROR_WRONG_TYPE)
            }
        }
    }

    private static createPoint(x: string, y: string): Point {
        return new Point(parseFloat(x), parseFloat(y))
    }

    private static createRectangle(lineArray: string[]): Rectangle {
        const leftTop: Point = ShapeFactory.createPoint(lineArray[1], lineArray[2])
        const width: number = parseFloat(lineArray[3])
        const height: number = parseFloat(lineArray[4])
        const outlineColor: string = lineArray[5]
        let fillColor = ''
        if (lineArray[6]) {
            fillColor = lineArray[6]
        }
        return new Rectangle(leftTop, width, height, outlineColor, fillColor)
    }

    private static createTriangle(lineArray: string[]): Triangle {
        const vertex1: Point = ShapeFactory.createPoint(lineArray[1], lineArray[2])
        const vertex2: Point = ShapeFactory.createPoint(lineArray[3], lineArray[4])
        const vertex3: Point = ShapeFactory.createPoint(lineArray[5], lineArray[6])
        const outlineColor: string = lineArray[7]
        let fillColor = ''
        if (lineArray[8]) {
            fillColor = lineArray[8]
        }
        return new Triangle(vertex1, vertex2, vertex3, outlineColor, fillColor)
    }

    private static createCircle(lineArray: string[]): Circle {
        const center: Point = ShapeFactory.createPoint(lineArray[1], lineArray[2])
        const radius: number = parseFloat(lineArray[3])
        const outlineColor: string = lineArray[4]
        let fillColor = ''
        if (lineArray[5]) {
            fillColor = lineArray[5]
        }
        return new Circle(center, radius, outlineColor, fillColor)
    }

    private static createLineSegment(lineArray: string[]): LineSegment {
        const startPoint: Point = ShapeFactory.createPoint(lineArray[1], lineArray[2])
        const endPoint: Point = ShapeFactory.createPoint(lineArray[3], lineArray[4])
        const outlineColor: string = lineArray[5]
        return new LineSegment(startPoint, endPoint, outlineColor)
    }
}