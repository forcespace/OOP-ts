import {expect} from 'chai'
import {describe} from 'mocha'
import {stringToArray} from '../../../src/lab-2/2.1'

describe('Each element of the array must be multiplied by a similar element of the original array', () => {
    it('The test should return an array of strings', () => {
        expect(stringToArray('any text', ' ')).eql(['any', 'text'])
    })
    it('The test should return an array of strings', () => {
        expect(stringToArray('any text', ' ')).eql(['any', 'text'])
    })
})