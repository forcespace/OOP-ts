import {expect} from 'chai'
import {describe} from 'mocha'
import {checkFullnessInputString, replaceInString} from '../../../src/lab-2/2.2.3'

describe('Find and replace line in string', () => {
    it('Replace line in string', () => {
        expect(replaceInString('any text', 'text', 'line')).eql('any line')
    })
    it('Check input for not empty', () => {
        expect(checkFullnessInputString('any text')).eql('any text')
    })
})