import {expect} from 'chai'
import {describe} from 'mocha'
import {CTime} from '../../../src/lab-5/5.4/CTime'

describe('Time', () => {
    let time: CTime

    it('init 10 hours', () => {
        time = new CTime(10, 0, 0)
        expect(time.getHours()).equal(10)
    })

    it('init 8 minutes', () => {
        time = new CTime(0, 6, 0)
        expect(time.getMinutes()).equal(6)
    })

    it('init 6 seconds', () => {
        time = new CTime(0, 0, 6)
        expect(time.getSeconds()).equal(6)
    })

    it('increment seconds', () => {
        time = new CTime(10, 0, 0)
        const result: CTime = new CTime(10, 0, 1)
        expect(time.prefixIncrement()).eql(result)
        expect(time).eql(result)
    })

    it('decrement seconds', () => {
        time = new CTime(10, 0, 1)
        const result: CTime = new CTime(10, 0, 0)
        expect(time.prefixDecrement()).eql(result)
        expect(time).eql(result)
    })

        it('10:00:00 and 1:11:11 = 11:11:11', () => {
        time = new CTime(10, 0, 0)
        const time2: CTime = new CTime(1, 11, 11)
        const result: CTime = new CTime(11, 11, 11)
        expect(CTime.add(time, time2)).eql(result)
    })

    it('11:11:11 - 1:11:11 = 10:00:00', () => {
        time = new CTime(11, 11, 11)
        const time2: CTime = new CTime(1, 11, 11)
        const result: CTime = new CTime(10, 0, 0)
        expect(CTime.sub(time, time2)).eql(result)
    })

    it('10:00:00 * 2 = 20:00:00', () => {
        time = new CTime(10, 0, 0)
        const coefficient: number = 2
        const multiResult: CTime = new CTime(20, 0, 0)
        expect(CTime.multi(time, coefficient)).eql(multiResult)
    })

    it('20:00:00 / 2 = 10:00:00', () => {
        time = new CTime(20, 0, 0)
        const coefficient: number = 2
        const divResult: CTime = new CTime(10, 0, 0)
        expect(CTime.div(time, coefficient)).eql(divResult)
    })

    it('09:59:59 + 01:00:01 = 11:00:00', () => {
        time = new CTime(9, 59, 59)
        const time2: CTime = new CTime(1, 0, 1)
        const addWithAssignment: CTime = new CTime(11, 0, 0)
        expect(time.addWithAssignment(time2)).eql(addWithAssignment)
        expect(time).eql(addWithAssignment)
    })

    it('11:00:00 + 01:00:01 = 11:00:00', () => {
        time = new CTime(14, 30, 25)
        const time2: CTime = new CTime(3, 18, 44)
        const subWithAssignment: CTime = new CTime(11, 11, 41)
        expect(time.subWithAssignment(time2)).eql(subWithAssignment)
        expect(time).eql(subWithAssignment)
    })

    it('01:00:00 * 3 = 03:00:00', () => {
        time = new CTime(1, 0, 0)
        const coefficient: number = 3
        const multiWithAssignmentResult: CTime = new CTime(3, 0, 0)
        expect(time.multiWithAssignment(coefficient)).eql(multiWithAssignmentResult)
        expect(time).eql(multiWithAssignmentResult)
    })

    it('a === b', () => {
        time = new CTime(10, 0, 0)
        const time2 = new CTime(10, 0, 1)
        expect(CTime.equal(time, time2)).equal(false)
    })

    it('a !== b', () => {
        time = new CTime(10, 0, 0)
        const time2 = new CTime(10, 0, 1)
        expect(CTime.notEqual(time, time2)).equal(true)
    })

    it('a > b', () => {
        time = new CTime(10, 0, 0)
        const time2 = new CTime(10, 0, 1)
        expect(CTime.isLarger(time, time2)).equal(false)
    })

    it('a <= b', () => {
        time = new CTime(10, 0, 0)
        const time2 = new CTime(10, 0, 1)
        expect(CTime.isNotLarger(time, time2)).equal(true)
    })

    it('a < b', () => {
        time = new CTime(10, 0, 0)
        const time2 = new CTime(10, 0, 1)
        expect(CTime.isLess(time, time2)).equal(true)
    })

    it('a >= b', () => {
        time = new CTime(10, 0, 0)
        const time2 = new CTime(10, 0, 1)
        expect(CTime.isNotLess(time, time2)).equal(false)
    })
})