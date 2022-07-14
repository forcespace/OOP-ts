import {expect} from 'chai'
import {describe} from 'mocha'
import {HttpUrl} from '../../../src/lab-6/6.1.7/HttpUrl'

describe('HttpUrl', () => {
    let httpUrl: HttpUrl

    it('original http url should be returned without default port', () => {
        httpUrl = new HttpUrl('http://www.abc.ru:80/')
        expect(httpUrl.getUrl()).eql('http://www.abc.ru/')
    })

    it('original http url should be returned', () => {
        httpUrl = new HttpUrl('http://www.abc.ru/')
        expect(httpUrl.getUrl()).eql('http://www.abc.ru/')
    })

    it('original https url should be returned without default port', () => {
        httpUrl = new HttpUrl('https://www.abc.ru:443/')
        expect(httpUrl.getUrl()).eql('https://www.abc.ru/')
    })

    it('original https url should be returned', () => {
        httpUrl = new HttpUrl('https://www.abc.ru/')
        expect(httpUrl.getUrl()).eql('https://www.abc.ru/')
    })

    it('protocol http should be returned', () => {
        httpUrl = new HttpUrl('http://www.abc.ru/')
        expect(httpUrl.getProtocol()).eql('http')
    })

    it('protocol https should be returned', () => {
        httpUrl = new HttpUrl('https://www.abc.ru/')
        expect(httpUrl.getProtocol()).eql('https')
    })

    it('upper case protocol is valid and should be returned in lower case', () => {
        httpUrl = new HttpUrl('HTTPS://www.abc.ru/')
        expect(httpUrl.getProtocol()).eql('https')
    })

    it('domain should be returned', () => {
        httpUrl = new HttpUrl('https://www.abc.ru/')
        expect(httpUrl.getDomain()).eql('www.abc.ru')
    })

    it('empty document should be returned', () => {
        httpUrl = new HttpUrl('https://www.abc.ru')
        expect(httpUrl.getDocument()).eql('/')
    })

    it('/ as document should be returned', () => {
        httpUrl = new HttpUrl('https://www.abc.ru/')
        expect(httpUrl.getDocument()).eql('/')
    })

    it('not empty document should be returned', () => {
        httpUrl = new HttpUrl('https://www.abc.ru/home')
        expect(httpUrl.getDocument()).eql('/home')
    })

    it('/:777 is correct document and should be returned', () => {
        httpUrl = new HttpUrl('http://abc/:777')
        expect(httpUrl.getDocument()).eql('/:777')
    })

    it('default http port should be returned', () => {
        httpUrl = new HttpUrl('http://www.abc.ru/')
        expect(httpUrl.getPort()).eql(80)
    })

    it('default https port should be returned', () => {
        httpUrl = new HttpUrl('https://www.abc.ru/')
        expect(httpUrl.getPort()).eql(443)
    })

    it('http port should be returned', () => {
        httpUrl = new HttpUrl('http://www.abc.ru:8080/')
        expect(httpUrl.getPort()).eql(8080)
    })

    it('https port should be returned', () => {
        httpUrl = new HttpUrl('https://www.abc.ru:9090/')
        expect(httpUrl.getPort()).eql(9090)
    })

    it('65535 is correct port and should be returned', () => {
        httpUrl = new HttpUrl('https://www.abc.ru:65535/')
        expect(httpUrl.getPort()).eql(65535)
    })

    it('domain with -- should return exception', () => {
        try {
            httpUrl = new HttpUrl('https://wwww.i--spring.ru/')
            expect(httpUrl.getDomain()).not.eql('www.i--spring.ru')
        } catch (error) {
            expect(error.message).eql('Wrong domain')
        }
    })

    it('domain start with - should return exception', () => {
        try {
            httpUrl = new HttpUrl('https://-wwww.abc.ru/')
            expect(httpUrl.getDomain()).not.eql('-www.abc.ru')
        } catch (error) {
            expect(error.message).eql('Wrong domain')
        }
    })

    it('domain end with - should return exception', () => {
        try {
            httpUrl = new HttpUrl('https://wwww.abc.ru-/')
            expect(httpUrl.getDomain()).not.eql('www.abc.ru-')
        } catch (error) {
            expect(error.message).eql('Wrong domain')
        }
    })

    it('domain with UpperCase should be returned', () => {
        httpUrl = new HttpUrl('https://wwww.abc.ru/')
        expect(httpUrl.getDomain()).eql('wwww.abc.ru')
    })

    it('domain with number should be returned', () => {
        httpUrl = new HttpUrl('https://wwww.1abc.ru/')
        expect(httpUrl.getDomain()).eql('wwww.1abc.ru')
    })

    it('document with _ should be returned', () => {
        httpUrl = new HttpUrl('https://wwww.abc.ru/_test')
        expect(httpUrl.getDocument()).eql('/_test')
    })

    it('document with ! should be returned', () => {
        httpUrl = new HttpUrl('https://wwww.abc.ru/!test')
        expect(httpUrl.getDocument()).eql('/!test')
    })

    it('document with ~ should be returned', () => {
        httpUrl = new HttpUrl('https://wwww.abc.ru/~test')
        expect(httpUrl.getDocument()).eql('/~test')
    })

    it('document with * should be returned', () => {
        httpUrl = new HttpUrl('https://wwww.abc.ru/*test')
        expect(httpUrl.getDocument()).eql('/*test')
    })

    it('document with \' should be returned', () => {
        httpUrl = new HttpUrl('https://wwww.abc.ru/\'test')
        expect(httpUrl.getDocument()).eql('/\'test')
    })

    it('parameter after ? shouldn\'t be included in document', () => {
        httpUrl = new HttpUrl('https://wwww.abc.ru/test?p=1')
        expect(httpUrl.getDocument()).eql('/test?p=1')
    })
})