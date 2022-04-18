import {createInterface, Interface} from 'node:readline'
import {stdin as input, stdout as output} from 'node:process'

type ProgramError = {
    code: number;
    message: string;
}

const ERRORS = {
    EMPTY_INPUT: {
        code: 1,
        message: 'Error. Empty input.'
    },
    NO_MATCHES: {
        code: 1,
        message: 'No matches.'
    }
}

type htmlSymbols = {
    key: string
    value: string
}

const symbols: htmlSymbols[] = [
    {
        key: '&',
        value: '&amp;'
    },
    {
        key: '"',
        value: '&quot;'
    },
    {
        key: '\'',
        value: '&apos;'
    },
    {
        key: '<',
        value: '&lt;'
    },
    {
        key: '>',
        value: '&gt;'
    }
]

function printErrorsAndExit(error: ProgramError) {
    console.log(error.message)
    process.exit(error.code)
}

export function encodeHtml(line: string): string {
    let encodeLine: string
    for (const symbol of symbols) {
        encodeLine = line.replaceAll(symbol.key, symbol.value)
        line = encodeLine
    }
    return line
}

function printLine(line: string): void {
    if (line !== '') {
        console.log(line)
    } else {
        printErrorsAndExit(ERRORS.EMPTY_INPUT)
    }
}

function main(): void {
    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.question('Enter string to encode the special characters of the text string with the corresponding HTML entities: \n',
        (answer: string) => {
            const readLineInterface: Interface = createInterface({input, output})
            const result = encodeHtml(answer)
            printLine(result)
            readLineInterface.close()
        })
}

main()