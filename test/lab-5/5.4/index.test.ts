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

        it('add 10:00:00 and 1:11:11 = 11:11:11', () => {
        time = new Time(10, 0, 0)
        const time2: Time = new Time(1, 11, 11)
        const result: Time = new Time(11, 11, 11)
        expect(Time.add(time, time2)).eql(result)
    })

    it('down 11:11:11 - 1:11:11 = 10:00:00', () => {
        time = new Time(11, 11, 11)
        const time2: Time = new Time(1, 11, 11)
        const result: Time = new Time(10, 0, 0)
        expect(Time.sub(time, time2)).eql(result)
    })

    it('multiply 10:00:00 * 2 = 20:00:00', () => {
        time = new Time(10, 0, 0)
        const coefficient: number = 2
        const multiResult: Time = new Time(20, 0, 0)
        expect(Time.multi(time, coefficient)).eql(multiResult)
    })

    it('div 20:00:00 / 2 = 10:00:00', () => {
        time = new Time(20, 0, 0)
        const coefficient: number = 2
        const divResult: Time = new Time(10, 0, 0)
        expect(Time.div(time, coefficient)).eql(divResult)
    })

    it('should be add up with assignment 14:30:25 and 3:18:44 and get 17:49:9', () => {
        time = new Time(14, 30, 25)
        const time2: Time = new Time(3, 18, 44)
        const addWithAssignment: Time = new Time(17, 49, 9)
        expect(time.addWithAssignment(time2)).eql(addWithAssignment)
        expect(time).eql(addWithAssignment)
    })

    it('should be turn down with assignment 14:30:25 and 3:18:44 and get 11:11:41', () => {
        time = new Time(14, 30, 25)
        const time2: Time = new Time(3, 18, 44)
        const subWithAssignment: Time = new Time(11, 11, 41)
        expect(time.subWithAssignment(time2)).eql(subWithAssignment)
        expect(time).eql(subWithAssignment)
    })

    it('should be multiply with assignment 14:30:25 and 3 and get 19:31:15', () => {
        time = new Time(14, 30, 25)
        const coefficient: number = 3
        const multiWithAssignmentResult: Time = new Time(19, 31, 15)
        expect(time.multiWithAssignment(coefficient)).eql(multiWithAssignmentResult)
        expect(time).eql(multiWithAssignmentResult)
    })

    it('should be div with assignment 23:59:58 on 0:0:2 = 11:58:59', () => {
        time = new Time(23, 59, 58)
        const divisor: Time = new Time(0, 0, 2)
        const divWithAssignmentResult: Time = new Time(11, 59, 59)
        expect(time.divWithAssignment(divisor)).eql(divWithAssignmentResult)
        expect(time).eql(divWithAssignmentResult)
    })

    it('shouldn\'t be larger with equal seconds', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 58)
        expect(Time.isLarger(time, time2)).equal(false)
    })

    it('should be not larger with less seconds ', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 59)
        expect(Time.isNotLarger(time, time2)).equal(true)
    })

    it('should be not larger with equal seconds', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 58)
        expect(Time.isNotLarger(time, time2)).equal(true)
    })

    it('shouldn\'t be not larger with more seconds', () => {
        time = new Time(23, 59, 59)
        const time2 = new Time(23, 59, 58)
        expect(Time.isNotLarger(time, time2)).equal(false)
    })

    it('should be less with less seconds ', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 59)
        expect(Time.isLess(time, time2)).equal(true)
    })

    it('shouldn\'t be less with equal seconds', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 58)
        expect(Time.isLess(time, time2)).equal(false)
    })

    it('should be not less with more seconds ', () => {
        time = new Time(23, 59, 59)
        const time2 = new Time(23, 59, 58)
        expect(Time.isNotLess(time, time2)).equal(true)
    })

    it('should be not less with equal seconds', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 58)
        expect(Time.isNotLess(time, time2)).equal(true)
    })

    it('shouldn\'t be not less with less seconds', () => {
        time = new Time(23, 59, 58)
        const time2 = new Time(23, 59, 59)
        expect(Time.isNotLess(time, time2)).equal(false)
    })
})