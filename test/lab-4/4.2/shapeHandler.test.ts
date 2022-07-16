import {expect} from 'chai'
import {describe} from 'mocha'
import {ShapeHandler} from '../../../src/lab-4/4.2/ShapeHandler'

describe('ShapeHandler', () => {
    let shapeHandler: ShapeHandler

    beforeEach(() => {
        shapeHandler = new ShapeHandler()
    })

    describe('getMaxAreaShape', () => {
        it('should get max from two different area rectangle', () => {
            shapeHandler.addShape('rectangle 470.3 395.15 50.7 80.4 251002 964b00')
            shapeHandler.addShape('rectangle 470.3 395.15 0.7 80.4 251002 964b00')
            expect(shapeHandler.getMaxAreaShape()).equal('rectangle\n' +
                'left top point: (470.3,395.15)\n' +
                'width: 50.7\n' +
                'height: 80.4\n' +
                'area: 4076.2800000000007\n' +
                'perimeter: 262.20000000000005\n' +
                'outline color: 251002\n' +
                'fill color: 964b00')
        })

        it('should get max from two different area different shape', () => {
            shapeHandler.addShape('triangle 500.3 250.15 650.7 400.4 350.15 400.4 013220 006600')
            shapeHandler.addShape('rectangle 470.3 395.15 0.7 80.4 251002 964b00')
            expect(shapeHandler.getMaxAreaShape()).equal('triangle\n' +
                'vertex1: (500.3,250.15)\n' +
                'vertex2: (650.7,400.4)\n' +
                'vertex3: (350.15,400.4)\n' +
                'area: 22578.818750000002\n' +
                'perimeter: 725.5565690607691\n' +
                'outline color: 013220\n' +
                'fill color: 006600')
        })

        it('should get max from one shape', () => {
            shapeHandler.addShape('triangle 500.3 250.15 650.7 400.4 350.15 400.4 013220 006600')
            expect(shapeHandler.getMaxAreaShape()).equal('triangle\n' +
                'vertex1: (500.3,250.15)\n' +
                'vertex2: (650.7,400.4)\n' +
                'vertex3: (350.15,400.4)\n' +
                'area: 22578.818750000002\n' +
                'perimeter: 725.5565690607691\n' +
                'outline color: 013220\n' +
                'fill color: 006600')
        })
    })
})