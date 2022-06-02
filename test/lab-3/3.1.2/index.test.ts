import {expect} from 'chai'
import {describe} from 'mocha'
import {Car, Gear} from '../../../src/lab-3/3.1.2/Car'

describe('Car:', () => {
    let car: Car

    describe('Create new default car', () => {
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

    describe('Engine', () => {
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
    })

    describe('Speed / Gears', () => {
        beforeEach(() => {
            car = new Car()
            car.TurnOnEngine()
        })

        it('Car on first gear should set speed 30', () => {
            car.SetGear(Gear.First)
            expect(car.GetGear()).equal(Gear.First)
            car.SetSpeed(30)
            expect(car.GetSpeed()).equal(30)
        })

        it('Car on second gear should set speed 50', () => {
            car.SetGear(Gear.First)
            car.SetSpeed(30)
            car.SetGear(Gear.Second)
            car.SetSpeed(50)
            expect(car.GetGear()).equal(Gear.Second)
            expect(car.GetSpeed()).equal(50)
        })

        it('Car on third gear should set speed 60', () => {
            car.SetGear(Gear.First)
            car.SetSpeed(30)
            car.SetGear(Gear.Second)
            car.SetSpeed(50)
            car.SetGear(Gear.Third)
            car.SetSpeed(60)
            expect(car.GetGear()).equal(Gear.Third)
            expect(car.GetSpeed()).equal(60)
        })

        it('Car on fourth gear should set speed 90', () => {
            car.SetGear(Gear.First)
            car.SetSpeed(30)
            car.SetGear(Gear.Second)
            car.SetSpeed(50)
            car.SetGear(Gear.Third)
            car.SetSpeed(60)
            car.SetGear(Gear.Fourth)
            car.SetSpeed(90)
            expect(car.GetGear()).equal(Gear.Fourth)
            expect(car.GetSpeed()).equal(90)
        })

        it('Car on fifth gear should set speed 90', () => {
            car.SetGear(Gear.First)
            car.SetSpeed(30)
            car.SetGear(Gear.Second)
            car.SetSpeed(50)
            car.SetGear(Gear.Third)
            car.SetSpeed(60)
            car.SetGear(Gear.Fourth)
            car.SetSpeed(90)
            car.SetGear(Gear.Fifth)
            car.SetSpeed(150)
            expect(car.GetGear()).equal(Gear.Fifth)
            expect(car.GetSpeed()).equal(150)
        })
    })

    describe('Direction', () => {
        beforeEach(() => {
            car = new Car()
            car.TurnOnEngine()
        })

        it('Car should move backward', () => {
            car.SetGear(Gear.Rear)
            car.SetSpeed(10)
            expect(car.GetDirection()).equal(-1)
        })

        it('Car should stand', () => {
            car.SetGear(Gear.Rear)
            car.SetSpeed(10)
            car.SetSpeed(0)
            expect(car.GetDirection()).equal(0)
        })

        it('Car should move forward', () => {
            car.SetGear(Gear.First)
            car.SetSpeed(10)
            expect(car.GetDirection()).equal(1)
        })
    })
})