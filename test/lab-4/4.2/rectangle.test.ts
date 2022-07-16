import {expect} from 'chai'
import {describe} from 'mocha'
import {CustomCanvas} from '../../../src/lab-4/4.2/CustomCanvas'
import {Rectangle} from '../../../src/lab-4/4.2/Rectangle'
import {Point} from '../../../src/lab-4/4.2/Point'

const sinon = require('sinon')

describe('Rectangle', () => {
    let rectangle: Rectangle
    let leftTop: Point
    let width: number
    let height: number
    let outlineColor: string

    describe('created', () => {
        it('with default fillColor = 0', () => {
            leftTop = {
                x: 1,
                y: 1,
            }
            width = 49
            height=49
            outlineColor = '000000'
            rectangle = new Rectangle(leftTop, width, height, outlineColor)
            expect(rectangle.getFillColor()).equal('000000')
        })
    })

    describe('perimeter', () => {
        it('should be equal 38 with leftTop = (1,1), width = 9 and height = 10', () => {
            leftTop = {
                x: 1,
                y: 1,
            }
            width = 9
            height = 10
            outlineColor = '000000'
            rectangle = new Rectangle(leftTop, width, height, outlineColor)
            expect(rectangle.getPerimeter()).equal(38)
        })

        it('should be equal 0 with leftTop = (1,1), width = 0 and height = 0', () => {
            leftTop = {
                x: 1,
                y: 1,
            }
            width = 0
            height = 0
            outlineColor = '000000'
            rectangle = new Rectangle(leftTop, width, height, outlineColor)
            expect(rectangle.getPerimeter()).equal(0)
        })
    })

    describe('area', () => {
        it('should be equal 100 with leftTop = (1,1), width = 10 and height = 10', () => {
            leftTop = {
                x: 1,
                y: 1,
            }
            width = 10
            height = 10
            outlineColor = '000000'
            rectangle = new Rectangle(leftTop, width, height, outlineColor)
            expect(rectangle.getArea()).equal(100)
        })

        it('should be equal 0 with leftTop = (1,1), width = 0 and height = 0', () => {
            leftTop = {
                x: 1,
                y: 1,
            }
            width = 0
            height = 0
            outlineColor = '000000'
            rectangle = new Rectangle(leftTop, width, height, outlineColor)
            expect(rectangle.getArea()).equal(0)
        })
    })

    describe('toString', () => {
        it('should be show info about shape type, left top point, width, height, outline color', () => {
            leftTop = {
                x: 1,
                y: 1,
            }
            width = 10
            height = 10
            outlineColor = '000000'
            rectangle = new Rectangle(leftTop, width, height, outlineColor)

            expect(rectangle.toString()).equal(
                'rectangle\n' +
                'left top point: (1,1)\n' +
                'width: 10\n' +
                'height: 10\n' +
                'area: 100\n' +
                'perimeter: 40\n' +
                'outline color: 000000\n' +
                'fill color: 000000')
        })
    })

    describe('draw', () => {
        it('should draw rectangle', () => {
            leftTop = {
                x: 1,
                y: 1,
            }
            width = 10
            height = 10
            outlineColor = '000000'
            rectangle = new Rectangle(leftTop, width, height, outlineColor)

            const canvas = new CustomCanvas()
            const mockCustomCanvas = sinon.mock(canvas)

            mockCustomCanvas.expects("setStrokeColor").once().withArgs(outlineColor)
            mockCustomCanvas.expects("setFillColor").once().withArgs('000000')
            mockCustomCanvas.expects("drawRectangle").once().withArgs(leftTop, width, height)

            rectangle.draw(mockCustomCanvas.object)

            mockCustomCanvas.verify()
        })
    })
})