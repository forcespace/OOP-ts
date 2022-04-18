import {expect} from 'chai'
import {describe} from 'mocha'
import {encodeHtml} from '../../../src/lab-2/2.2.4'

describe('Input string to encode the special characters of the text string with the corresponding HTML entities', () => {
    it('Function not to replace line without htmlSymbols', () => {
        expect(encodeHtml('any text')).eql('any text')
    })
    it('Function not to replace empty input', () => {
        expect(encodeHtml('')).eql('')
    })
})