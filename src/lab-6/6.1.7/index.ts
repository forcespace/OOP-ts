import {createInterface, Interface} from 'node:readline'
import {stdin as input, stdout as output} from 'process'
import {HttpUrl} from './HttpUrl'
import {UrlParsingError} from './UrlParsingError'

const MESSAGE_WELCOME_INPUT = 'For "exit" enter exit.\n' +
                              'Pls enter URL for parsing:'
const STOP_PROGRAM = 'exit'

function printMessage(error: string) {
    console.log(error)
}

function printParsingURL(httpUrl: HttpUrl) {
    console.log(
        `Protocol: ${httpUrl.getProtocol()}\n` +
        `Document: ${httpUrl.getDocument()}\n` +
        `URL: ${httpUrl.getUrl()}\n` +
        `Domain: ${httpUrl.getDomain()}\n` +
        `Port: ${httpUrl.getPort()}`
    )
}

function main(): void {
    const readLineInterface: Interface = createInterface({input, output})
    printMessage(MESSAGE_WELCOME_INPUT)
    readLineInterface.on('line', (message: string) => {
        if (message === STOP_PROGRAM) {
            readLineInterface.close()

            return
        }
        try {
            const httpUrl: HttpUrl = new HttpUrl(message)
            printParsingURL(httpUrl)
        } catch (error) {
            const err: UrlParsingError = error as UrlParsingError
            printMessage(err.message)
        }
    })
}

main()