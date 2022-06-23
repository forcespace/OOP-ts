import {expect} from 'chai'
import {describe} from 'mocha'
import {arrayToString, getWordsCount, stringToArray} from '../../../src/lab-2/2.3.1'

describe('Counting the frequency of occurrence of words', () => {
    it('The test should return an array of strings', () => {
        expect(stringToArray('any text', ' ')).eql(['any', 'text'])
    })

    it('The test should return object of strings and counts', () => {
        expect(getWordsCount(['any', 'text'])).eql({'any': 1, 'text': 1})
    })

    it('The test should return string of array', () => {
        expect(arrayToString(['any', 'text'], '')).eql('anytext')
    })
})