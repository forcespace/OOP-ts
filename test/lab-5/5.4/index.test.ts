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

        it('add 10:00:00 and 1:11:11 = 11:11:11', () => {
        time = new Index(10, 0, 0)
        const time2: Index = new Index(1, 11, 11)
        const result: Index = new Index(11, 11, 11)
        expect(Index.add(time, time2)).eql(result)
    })

    it('down 11:11:11 - 1:11:11 = 10:00:00', () => {
        time = new Index(11, 11, 11)
        const time2: Index = new Index(1, 11, 11)
        const result: Index = new Index(10, 0, 0)
        expect(Index.sub(time, time2)).eql(result)
    })

    it('multiply 10:00:00 * 2 = 20:00:00', () => {
        time = new Index(10, 0, 0)
        const coefficient: number = 2
        const multiResult: Index = new Index(20, 0, 0)
        expect(Index.multi(time, coefficient)).eql(multiResult)
    })

    it('div 20:00:00 / 2 = 10:00:00', () => {
        time = new Index(20, 0, 0)
        const coefficient: number = 2
        const divResult: Index = new Index(10, 0, 0)
        expect(Index.div(time, coefficient)).eql(divResult)
    })

    it('should be add up with assignment 14:30:25 and 3:18:44 and get 17:49:9', () => {
        time = new Index(14, 30, 25)
        const time2: Index = new Index(3, 18, 44)
        const addWithAssignment: Index = new Index(17, 49, 9)
        expect(time.addWithAssignment(time2)).eql(addWithAssignment)
        expect(time).eql(addWithAssignment)
    })

    it('should be turn down with assignment 14:30:25 and 3:18:44 and get 11:11:41', () => {
        time = new Index(14, 30, 25)
        const time2: Index = new Index(3, 18, 44)
        const subWithAssignment: Index = new Index(11, 11, 41)
        expect(time.subWithAssignment(time2)).eql(subWithAssignment)
        expect(time).eql(subWithAssignment)
    })

    it('should be multiply with assignment 14:30:25 and 3 and get 19:31:15', () => {
        time = new Index(14, 30, 25)
        const coefficient: number = 3
        const multiWithAssignmentResult: Index = new Index(19, 31, 15)
        expect(time.multiWithAssignment(coefficient)).eql(multiWithAssignmentResult)
        expect(time).eql(multiWithAssignmentResult)
    })

    it('should be div with assignment 23:59:58 on 0:0:2 = 11:58:59', () => {
        time = new Index(23, 59, 58)
        const divisor: Index = new Index(0, 0, 2)
        const divWithAssignmentResult: Index = new Index(11, 59, 59)
        expect(time.divWithAssignment(divisor)).eql(divWithAssignmentResult)
        expect(time).eql(divWithAssignmentResult)
    })

    it('shouldn\'t be larger with equal seconds', () => {
        time = new Index(23, 59, 58)
        const time2 = new Index(23, 59, 58)
        expect(Index.isLarger(time, time2)).equal(false)
    })

    it('should be not larger with less seconds ', () => {
        time = new Index(23, 59, 58)
        const time2 = new Index(23, 59, 59)
        expect(Index.isNotLarger(time, time2)).equal(true)
    })

    it('should be not larger with equal seconds', () => {
        time = new Index(23, 59, 58)
        const time2 = new Index(23, 59, 58)
        expect(Index.isNotLarger(time, time2)).equal(true)
    })

    it('shouldn\'t be not larger with more seconds', () => {
        time = new Index(23, 59, 59)
        const time2 = new Index(23, 59, 58)
        expect(Index.isNotLarger(time, time2)).equal(false)
    })

    it('should be less with less seconds ', () => {
        time = new Index(23, 59, 58)
        const time2 = new Index(23, 59, 59)
        expect(Index.isLess(time, time2)).equal(true)
    })

    it('shouldn\'t be less with equal seconds', () => {
        time = new Index(23, 59, 58)
        const time2 = new Index(23, 59, 58)
        expect(Index.isLess(time, time2)).equal(false)
    })

    it('should be not less with more seconds ', () => {
        time = new Index(23, 59, 59)
        const time2 = new Index(23, 59, 58)
        expect(Index.isNotLess(time, time2)).equal(true)
    })

    it('should be not less with equal seconds', () => {
        time = new Index(23, 59, 58)
        const time2 = new Index(23, 59, 58)
        expect(Index.isNotLess(time, time2)).equal(true)
    })

    it('shouldn\'t be not less with less seconds', () => {
        time = new Index(23, 59, 58)
        const time2 = new Index(23, 59, 59)
        expect(Index.isNotLess(time, time2)).equal(false)
    })
})