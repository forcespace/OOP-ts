import {expect} from 'chai'
import {describe} from 'mocha'
import {Index} from '../../../src/lab-5/5.4'

describe('Time', () => {
    let time: Index

    it('init 10 hours', () => {
        time = new Index(10, 0, 0)
        expect(time.getHours()).equal(10)
    })

    it('init 8 minutes', () => {
        time = new Index(0, 6, 0)
        expect(time.getMinutes()).equal(6)
    })

    it('init 6 seconds', () => {
        time = new Index(0, 0, 6)
        expect(time.getSeconds()).equal(6)
    })

    it('increment seconds', () => {
        time = new Index(10, 0, 0)
        const result: Index = new Index(10, 0, 1)
        expect(time.prefixIncrement()).eql(result)
        expect(time).eql(result)
    })

    it('decrement seconds', () => {
        time = new Index(10, 0, 1)
        const result: Index = new Index(10, 0, 0)
        expect(time.prefixDecrement()).eql(result)
        expect(time).eql(result)
    })

        it('10:00:00 and 1:11:11 = 11:11:11', () => {
        time = new Index(10, 0, 0)
        const time2: Index = new Index(1, 11, 11)
        const result: Index = new Index(11, 11, 11)
        expect(Index.add(time, time2)).eql(result)
    })

    it('11:11:11 - 1:11:11 = 10:00:00', () => {
        time = new Index(11, 11, 11)
        const time2: Index = new Index(1, 11, 11)
        const result: Index = new Index(10, 0, 0)
        expect(Index.sub(time, time2)).eql(result)
    })

    it('10:00:00 * 2 = 20:00:00', () => {
        time = new Index(10, 0, 0)
        const coefficient: number = 2
        const multiResult: Index = new Index(20, 0, 0)
        expect(Index.multi(time, coefficient)).eql(multiResult)
    })

    it('20:00:00 / 2 = 10:00:00', () => {
        time = new Index(20, 0, 0)
        const coefficient: number = 2
        const divResult: Index = new Index(10, 0, 0)
        expect(Index.div(time, coefficient)).eql(divResult)
    })

    it('09:59:59 + 01:00:01 = 11:00:00', () => {
        time = new Index(9, 59, 59)
        const time2: Index = new Index(1, 0, 1)
        const addWithAssignment: Index = new Index(11, 0, 0)
        expect(time.addWithAssignment(time2)).eql(addWithAssignment)
        expect(time).eql(addWithAssignment)
    })

    it('11:00:00 + 01:00:01 = 11:00:00', () => {
        time = new Index(14, 30, 25)
        const time2: Index = new Index(3, 18, 44)
        const subWithAssignment: Index = new Index(11, 11, 41)
        expect(time.subWithAssignment(time2)).eql(subWithAssignment)
        expect(time).eql(subWithAssignment)
    })

    it('01:00:00 * 3 = 03:00:00', () => {
        time = new Index(1, 0, 0)
        const coefficient: number = 3
        const multiWithAssignmentResult: Index = new Index(3, 0, 0)
        expect(time.multiWithAssignment(coefficient)).eql(multiWithAssignmentResult)
        expect(time).eql(multiWithAssignmentResult)
    })

    it('a === b', () => {
        time = new Index(10, 0, 0)
        const time2 = new Index(10, 0, 1)
        expect(Index.equal(time, time2)).equal(false)
    })

    it('a !== b', () => {
        time = new Index(10, 0, 0)
        const time2 = new Index(10, 0, 1)
        expect(Index.notEqual(time, time2)).equal(true)
    })

    it('a > b', () => {
        time = new Index(10, 0, 0)
        const time2 = new Index(10, 0, 1)
        expect(Index.isLarger(time, time2)).equal(false)
    })

    it('a <= b', () => {
        time = new Index(10, 0, 0)
        const time2 = new Index(10, 0, 1)
        expect(Index.isNotLarger(time, time2)).equal(true)
    })

    it('a < b', () => {
        time = new Index(10, 0, 0)
        const time2 = new Index(10, 0, 1)
        expect(Index.isLess(time, time2)).equal(true)
    })

    it('a >= b', () => {
        time = new Index(10, 0, 0)
        const time2 = new Index(10, 0, 1)
        expect(Index.isNotLess(time, time2)).equal(false)
    })
})