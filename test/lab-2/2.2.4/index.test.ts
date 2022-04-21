import {expect} from 'chai'
import {describe} from 'mocha'
import {encodeHtml} from '../../../src/lab-2/2.2.4'

describe('String to encode the special characters of the text string with the corresponding HTML entities', () => {
    it('Function not to encode line without htmlSymbols', () => {
        expect(encodeHtml('text')).eql('text')
    })
    it('Function not to replace line if input is empty', () => {
        expect(encodeHtml('')).eql('')
    })
    it('Space in input not be encoded', function () {
        expect(encodeHtml(' ')).eql(' ')
    })
    it('Correct encode HTML symbols', function () {
        expect(encodeHtml('Cat <says> "Meow". M&M\'s')).eql('Cat &lt;says&gt; &quot;Meow&quot;. M&amp;M&apos;s')
    })
})