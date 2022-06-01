import {expect} from 'chai'
import {describe} from 'mocha'
import {Car, Gear} from '../../../src/lab-3/3.1.2/Car'

describe('Car:', () => {
    let car: Car

    describe('Create new car', () => {
        beforeEach(() => {
            car = new Car()
        })

        it('Car should be created with turned off engine', () => {
            expect(car.IsTurnedOn()).equal(false)
        })

        it('Car should be created with stand direction', () => {
            expect(car.GetDirection()).equal(0)
        })

        it('Car should be created with zero speed', () => {
            expect(car.GetSpeed()).equal(0)
        })

        it('Car should be created with neutral gear', () => {
            expect(car.GetGear()).equal('0')
        })
    })

    describe('engine tests.', () => {
        beforeEach(() => {
            car = new Car()
        })

        it('Car should turn on the engine', () => {
            car.TurnOnEngine()
            expect(car.IsTurnedOn()).equal(true)
        })

        it('Car should turn off the engine', () => {
            car.TurnOffEngine()
            expect(car.GetGear()).equal('0')
            expect(car.GetSpeed()).equal(0)
            expect(car.IsTurnedOn()).equal(false)
        })

        it('Car shouldn\'t turn off the engine with not stand direction', () => {
            car.TurnOnEngine()
            car.SetGear(Gear.First)
            expect(car.IsTurnedOn()).equal(true)
        })
    })
})