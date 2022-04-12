import {expect} from 'chai'
import {describe} from 'mocha'
import {arrayOfStringToArrayOfNumber, getMinElementOfArray, multipleElementsOfArrayToMin, sortArray, stringToArray} from '../../../src/lab-2/2.1'

describe('Each element of the array must be multiplied by a similar element of the original array', () => {
    it('The test should return an array of strings', () => {
        expect(stringToArray('any text', ' ')).eql(['any', 'text'])
    })
    it('Converting a character to a number of float', () => {
        expect(arrayOfStringToArrayOfNumber(['1', '2', '1.2'])).eql([1, 2, 1.2])
    })
    it('Get the minimum element in an array', () => {
        expect(getMinElementOfArray([5, 2, 10.2])).eql(2)
    })
    it('Multiply elements in an array by the minimum element of that array', () => {
        expect(multipleElementsOfArrayToMin([10, 20, 2, 30])).eql([20, 40, 4, 60])
    })
    it('Sort array of ASC', () => {
        expect(sortArray([10, 20, 2, 30])).eql([2, 10, 20, 30])
    })
})