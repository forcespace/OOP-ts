import {expect} from 'chai'
import {describe} from 'mocha'
import {CustomCanvas} from '../../../src/lab-4/4.2/CustomCanvas'
import {Circle} from '../../../src/lab-4/4.2/Circle'
import {Point} from '../../../src/lab-4/4.2/Point'

const sinon = require('sinon')

describe('Circle', () => {
    let circle: Circle
    let center: Point
    let radius: number
    let outlineColor: string
    let fillColor: string

    describe('created', () => {
        it('with default fillColor = 0', () => {
            center = {
                x: 1,
                y: 1
            }
            radius = 49
            outlineColor = '000000'
            circle = new Circle(center, radius, outlineColor)
            expect(circle.getFillColor()).equal('000000')
        })
    })

    describe('perimeter', () => {
        it('should be equal 62.83185307179586 with center = (1,1) and radius = 10', () => {
            center = {
                x: 1,
                y: 1
            }
            radius = 10
            outlineColor = '000000'
            fillColor = '000000'
            circle = new Circle(center, radius, outlineColor)
            expect(circle.getPerimeter()).equal(62.83185307179586)
        })

        it('should be equal 0 with center = (1,1), radius = 0 and height = 0', () => {
            center = {
                x: 1,
                y: 1
            }
            radius = 0
            outlineColor = '000000'
            fillColor = '000000'
            circle = new Circle(center, radius, outlineColor)
            expect(circle.getPerimeter()).equal(0)
        })
    })

    describe('area', () => {
        it('should be equal 314.1592653589793 with center = (1,1) and radius = 10', () => {
            center = {
                x: 1,
                y: 1
            }
            radius = 10
            outlineColor = '000000'
            fillColor = '000000'
            circle = new Circle(center, radius, outlineColor)
            expect(circle.getArea()).equal(314.1592653589793)
        })

        it('should be equal 0 with center = (1,1), radius = 0 and height = 0', () => {
            center = {
                x: 1,
                y: 1
            }
            radius = 0
            outlineColor = '000000'
            fillColor = '000000'
            circle = new Circle(center, radius, outlineColor)
            expect(circle.getArea()).equal(0)
        })
    })

    describe('toString', () => {
        it('should be show info about shape type, left top point, radius, outline color', () => {
            center = {
                x: 1,
                y: 1
            }
            radius = 10
            outlineColor = '000000'
            fillColor = '0000ff'
            circle = new Circle(center, radius, outlineColor, fillColor)
            expect(circle.toString()).equal(
                'circle\n' +
                'center: (1,1)\n' +
                'radius: 10\n' +
                'area: 314.1592653589793\n' +
                'perimeter: 62.83185307179586\n' +
                'outline color: 000000\n' +
                'fill color: 0000ff')
        })
    })

    describe('draw', () => {
        it('should draw circle', () => {
            center = {
                x: 1,
                y: 1
            }
            radius = 0
            outlineColor = '000000'
            fillColor = '000000'
            circle = new Circle(center, radius, outlineColor)

            const canvas = new CustomCanvas()
            const mockCustomCanvas = sinon.mock(canvas)

            mockCustomCanvas.expects('setStrokeColor').once().withArgs(outlineColor)
            mockCustomCanvas.expects('setFillColor').once().withArgs(fillColor)
            mockCustomCanvas.expects('drawCircle').once().withArgs(center, radius)

            circle.draw(mockCustomCanvas.object)

            mockCustomCanvas.verify()
        })
    })
})