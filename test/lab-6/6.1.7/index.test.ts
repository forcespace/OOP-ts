import {expect} from 'chai'
import {describe} from 'mocha'
import {HttpUrl} from '../../../src/lab-6/6.1.7/HttpUrl'

describe('HttpUrl', () => {
    let httpUrl: HttpUrl

    it('return protocol', () => {
        httpUrl = new HttpUrl('http://www.abc.ru/')
        expect(httpUrl.getProtocol()).eql('http')
    })

    it('return protocol', () => {
        httpUrl = new HttpUrl('https://www.abc.ru/')
        expect(httpUrl.getProtocol()).eql('https')
    })

    it('return in lower case', () => {
        httpUrl = new HttpUrl('HTTPS://www.abc.ru/')
        expect(httpUrl.getProtocol()).eql('https')
    })

    it('return domain', () => {
        httpUrl = new HttpUrl('https://www.abc.ru/')
        expect(httpUrl.getDomain()).eql('www.abc.ru')
    })

    it('return "/" as document', () => {
        httpUrl = new HttpUrl('https://www.abc.ru/')
        expect(httpUrl.getDocument()).eql('/')
    })

    it('return /:8080', () => {
        httpUrl = new HttpUrl('http://abc/:8080')
        expect(httpUrl.getDocument()).eql('/:8080')
    })

    it('return default http port', () => {
        httpUrl = new HttpUrl('http://www.abc.ru/')
        expect(httpUrl.getPort()).eql(80)
    })

    it('return default https port', () => {
        httpUrl = new HttpUrl('https://www.abc.ru/')
        expect(httpUrl.getPort()).eql(443)
    })

    it('return port', () => {
        httpUrl = new HttpUrl('http://www.abc.ru:8080/')
        expect(httpUrl.getPort()).eql(8080)
    })

    it('return port', () => {
        httpUrl = new HttpUrl('https://www.abc.ru:9090/')
        expect(httpUrl.getPort()).eql(9090)
    })

    it('return 65535', () => {
        httpUrl = new HttpUrl('https://www.abc.ru:65535/')
        expect(httpUrl.getPort()).eql(65535)
    })

    it('return error', () => {
        try {
            httpUrl = new HttpUrl('https://-wwww.abc.ru/')
            expect(httpUrl.getDomain()).not.eql('-www.abc.ru')
        } catch (error) {
            expect(error.message).eql('Wrong domain')
        }
    })

    it('return error', () => {
        try {
            httpUrl = new HttpUrl('https://wwww.abc.ru-/')
            expect(httpUrl.getDomain()).not.eql('www.abc.ru-')
        } catch (error) {
            expect(error.message).eql('Wrong domain')
        }
    })

    it('return domain', () => {
        httpUrl = new HttpUrl('https://wwww.1abc.ru/')
        expect(httpUrl.getDomain()).eql('wwww.1abc.ru')
    })

    it('return with "_"', () => {
        httpUrl = new HttpUrl('https://wwww.abc.ru/_test')
        expect(httpUrl.getDocument()).eql('/_test')
    })

    it('return parameter', () => {
        httpUrl = new HttpUrl('https://wwww.abc.ru/test?p=1')
        expect(httpUrl.getDocument()).eql('/test?p=1')
    })
})