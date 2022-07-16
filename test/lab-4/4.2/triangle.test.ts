import {expect} from 'chai'
import {describe} from 'mocha'
import {CustomCanvas} from '../../../src/lab-4/4.2/CustomCanvas'
import {Triangle} from '../../../src/lab-4/4.2/Triangle'
import {Point} from '../../../src/lab-4/4.2/Point'

const sinon = require('sinon')

describe('Triangle', () => {
    let triangle: Triangle
    let vertex1: Point
    let vertex2: Point
    let vertex3: Point
    let outlineColor: string
    let fillColor: string

    describe('created', () => {
        it('with default fillColor = 0', () => {
            vertex1 = {
                x: 1,
                y: 1,
            }
            vertex2 = {
                x: 1,
                y: 1,
            }
            vertex3 = {
                x: 1,
                y: 1,
            }
            outlineColor = '000000'
            triangle = new Triangle(vertex1, vertex2, vertex3, outlineColor, fillColor)
            expect(triangle.getFillColor()).equal('000000')
        })
    })

    describe('perimeter', () => {
        it('should be equal 12 with vertex1 = (0,0), vertex2 = (3, 0), vertex3 = (0, 4)', () => {
            vertex1 = {
                x: 0,
                y: 0,
            }
            vertex2 = {
                x: 3,
                y: 0,
            }
            vertex3 = {
                x: 0,
                y: 4,
            }
            outlineColor = '000000'
            fillColor = '000000'
            triangle = new Triangle(vertex1, vertex2, vertex3, outlineColor, fillColor)
            expect(triangle.getPerimeter()).equal(12)
        })

        it('should be equal 0 with vertex1 = (0,0), vertex2 = (0, 0), vertex3 = (0, 0)', () => {
            vertex1 = {
                x: 0,
                y: 0,
            }
            vertex2 = {
                x: 0,
                y: 0,
            }
            vertex3 = {
                x: 0,
                y: 0,
            }
            outlineColor = '000000'
            fillColor = '000000'
            triangle = new Triangle(vertex1, vertex2, vertex3, outlineColor, fillColor)
            expect(triangle.getPerimeter()).equal(0)
        })
    })

    describe('area', () => {
        it('should be equal 6 with vertex1 = (0,0), vertex2 = (3, 0), vertex3 = (0, 4)', () => {
            vertex1 = {
                x: 0,
                y: 0,
            }
            vertex2 = {
                x: 3,
                y: 0,
            }
            vertex3 = {
                x: 0,
                y: 4,
            }
            outlineColor = '000000'
            fillColor = '000000'
            triangle = new Triangle(vertex1, vertex2, vertex3, outlineColor, fillColor)
            expect(triangle.getArea()).equal(6)
        })

        it('should be equal 0 with vertex1 = (0,0), vertex2 = (0, 0), vertex3 = (0, 0)', () => {
            vertex1 = {
                x: 0,
                y: 0,
            }
            vertex2 = {
                x: 0,
                y: 0,
            }
            vertex3 = {
                x: 0,
                y: 0,
            }
            outlineColor = '000000'
            fillColor = '000000'
            triangle = new Triangle(vertex1, vertex2, vertex3, outlineColor, fillColor)
            expect(triangle.getArea()).equal(0)
        })
    })

    describe('toString', () => {
        it('should be show info about shape type, left top point, width, height, outline color', () => {
            vertex1 = {
                x: 0,
                y: 0,
            }
            vertex2 = {
                x: 3,
                y: 0,
            }
            vertex3 = {
                x: 0,
                y: 4,
            }
            outlineColor = '000000'
            fillColor = '0000ff'
            triangle = new Triangle(vertex1, vertex2, vertex3, outlineColor, fillColor)
            expect(triangle.toString()).equal(
                'triangle\n' +
                'vertex1: (0,0)\n' +
                'vertex2: (3,0)\n' +
                'vertex3: (0,4)\n' +
                'area: 6\n' +
                'perimeter: 12\n' +
                'outline color: 000000\n' +
                'fill color: 0000ff')
        })
    })

    describe('draw', () => {
        it('should draw triangle', () => {
            vertex1 = {
                x: 0,
                y: 0,
            }
            vertex2 = {
                x: 3,
                y: 0,
            }
            vertex3 = {
                x: 0,
                y: 4,
            }
            outlineColor = '000000'
            fillColor = '0000ff'
            triangle = new Triangle(vertex1, vertex2, vertex3, outlineColor, fillColor)

            const canvas = new CustomCanvas()
            const mockCustomCanvas = sinon.mock(canvas)

            mockCustomCanvas.expects("setStrokeColor").once().withArgs(outlineColor)
            mockCustomCanvas.expects("setFillColor").once().withArgs(fillColor)

            const points: Point[] = [vertex1, vertex2, vertex3]
            mockCustomCanvas.expects("drawPolygon").once().withArgs(points)

            triangle.draw(mockCustomCanvas.object)

            mockCustomCanvas.verify()
        })
    })
})