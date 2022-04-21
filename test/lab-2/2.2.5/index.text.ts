import {expect} from 'chai'
import {describe} from 'mocha'
import {decodeHtml} from '../../../src/lab-2/2.2.5'

describe('String to decoding the HTML entities of the html string, back to their character representation', () => {
    it('Function not to decode line without htmlSymbols', () => {
        expect(decodeHtml('& amp;')).eql('& amp;')
    })
    it('Function not to replace line if input is empty', () => {
        expect(decodeHtml('')).eql('')
    })
    it('Space in input not be decoded', function () {
        expect(decodeHtml(' ')).eql(' ')
    })
    it('Correct decode HTML symbols', function () {
        expect(decodeHtml('Cat &lt;says&gt; &quot;Meow&quot;. M&amp;M&apos;s')).eql('Cat <says> "Meow". M&M\'s')
    })
})