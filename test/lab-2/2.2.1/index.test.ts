import {expect} from 'chai'
import {describe} from 'mocha'
import {checkFullnessInputString, trimAroundString} from '../../../src/lab-2/2.2.1'

describe('Removing spaces around a string', () => {
    it('Removing spaces around a string', () => {
        expect(trimAroundString(' any text ')).eql('any text')
    })
    it('Check input for not empty', () => {
        expect(checkFullnessInputString('any text')).eql('any text')
    })
})