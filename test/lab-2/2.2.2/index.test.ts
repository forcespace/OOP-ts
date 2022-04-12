import {expect} from 'chai'
import {describe} from 'mocha'
import {checkFullnessInputString, trimString} from '../../../src/lab-2/2.2.2'

describe('Removing extra spaces in string', () => {
    it('Removing extra spaces in string', () => {
        expect(trimString(' any   text ')).eql('any text')
    })
    it('Check input for not empty', () => {
        expect(checkFullnessInputString('any text')).eql('any text')
    })
})