import {expect} from 'chai'
import {describe} from 'mocha'
import {Time} from '../../../src/lab-5/5.4/Time'

describe('Time', () => {
    let time: Time

    it('init 10 hours', () => {
        time = new Time(10, 0, 0)
        expect(time.getHours()).equal(10)
    })

    it('init 8 minutes', () => {
        time = new Time(0, 6, 0)
        expect(time.getMinutes()).equal(6)
    })

    it('init 6 seconds', () => {
        time = new Time(0, 0, 6)
        expect(time.getSeconds()).equal(6)
    })

    it('increment seconds', () => {
        time = new Time(10, 0, 0)
        const result: Time = new Time(10, 0, 1)
        expect(time.prefixIncrement()).eql(result)
        expect(time).eql(result)
    })

    it('decrement seconds', () => {
        time = new Time(10, 0, 1)
        const result: Time = new Time(10, 0, 0)
        expect(time.prefixDecrement()).eql(result)
        expect(time).eql(result)
    })

        it('10:00:00 + 1:11:11 = 11:11:11', () => {
        time = new Time(10, 0, 0)
        const time2: Time = new Time(1, 11, 11)
        const result: Time = new Time(11, 11, 11)
        expect(Time.add(time, time2)).eql(result)
    })

    it('23:00:00 + 0:59:59 = 23:59:59', () => {
        time = new Time(23, 0, 0)
        const time2: Time = new Time(0, 59, 59)
        const result: Time = new Time(23, 59, 59)
        expect(Time.add(time, time2)).eql(result)
    })

    it('23:00:00 + 1:00:00 = 00:00:00', () => {
        time = new Time(23, 0, 0)
        const time2: Time = new Time(1, 0, 0)
        const result: Time = new Time(0, 0, 0)
        expect(Time.add(time, time2)).eql(result)
    })

    it('23:00:00 + 1:00:01 = 00:00:01', () => {
        time = new Time(23, 0, 0)
        const time2: Time = new Time(1, 0, 1)
        const result: Time = new Time(0, 0, 1)
        expect(Time.add(time, time2)).eql(result)
    })

    it('11:11:11 - 1:11:11 = 10:00:00', () => {
        time = new Time(11, 11, 11)
        const time2: Time = new Time(1, 11, 11)
        const result: Time = new Time(10, 0, 0)
        expect(Time.sub(time, time2)).eql(result)
    })

    it('00:00:01 - 00:00:01 = 00:00:00', () => {
        time = new Time(0, 0, 1)
        const time2: Time = new Time(0, 0, 1)
        const result: Time = new Time(0, 0, 0)
        expect(Time.sub(time, time2)).eql(result)
    })

    it('00:00:01 - 00:00:02 = 23:59:59', () => {
        time = new Time(0, 0, 1)
        const time2: Time = new Time(0, 0, 2)
        const result: Time = new Time(23, 59, 59)
        expect(Time.sub(time, time2)).eql(result)
    })

    it('10:00:00 * 2 = 20:00:00', () => {
        time = new Time(10, 0, 0)
        const coefficient: number = 2
        const multiResult: Time = new Time(20, 0, 0)
        expect(Time.multi(time, coefficient)).eql(multiResult)
    })

    it('20:00:00 / 2 = 10:00:00', () => {
        time = new Time(20, 0, 0)
        const coefficient: number = 2
        const divResult: Time = new Time(10, 0, 0)
        expect(Time.div(time, coefficient)).eql(divResult)
    })

    it('09:59:59 + 01:00:01 = 11:00:00', () => {
        time = new Time(9, 59, 59)
        const time2: Time = new Time(1, 0, 1)
        const addWithAssignment: Time = new Time(11, 0, 0)
        expect(time.addWithAssignment(time2)).eql(addWithAssignment)
        expect(time).eql(addWithAssignment)
    })

    it('11:00:01 - 01:00:01 = 10:00:00', () => {
        time = new Time(11, 0, 0)
        const time2: Time = new Time(1, 0, 0)
        const subWithAssignment: Time = new Time(10, 0, 0)
        expect(time.subWithAssignment(time2)).eql(subWithAssignment)
        expect(time).eql(subWithAssignment)
    })

    it('01:00:00 * 3 = 03:00:00', () => {
        time = new Time(1, 0, 0)
        const coefficient: number = 3
        const multiWithAssignmentResult: Time = new Time(3, 0, 0)
        expect(time.multiWithAssignment(coefficient)).eql(multiWithAssignmentResult)
        expect(time).eql(multiWithAssignmentResult)
    })

    it('a === b', () => {
        time = new Time(10, 0, 0)
        const time2 = new Time(10, 0, 1)
        expect(Time.equal(time, time2)).equal(false)
    })

    it('a !== b', () => {
        time = new Time(10, 0, 0)
        const time2 = new Time(10, 0, 1)
        expect(Time.notEqual(time, time2)).equal(true)
    })

    it('a > b', () => {
        time = new Time(10, 0, 0)
        const time2 = new Time(10, 0, 1)
        expect(Time.isLarger(time, time2)).equal(false)
    })

    it('a <= b', () => {
        time = new Time(10, 0, 0)
        const time2 = new Time(10, 0, 1)
        expect(Time.isNotLarger(time, time2)).equal(true)
    })

    it('a < b', () => {
        time = new Time(10, 0, 0)
        const time2 = new Time(10, 0, 1)
        expect(Time.isLess(time, time2)).equal(true)
    })

    it('a >= b', () => {
        time = new Time(10, 0, 0)
        const time2 = new Time(10, 0, 1)
        expect(Time.isNotLess(time, time2)).equal(false)
    })
})