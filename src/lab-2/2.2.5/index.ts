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
        key: '&amp;',
        value: '&'
    },
    {
        key: '&quot;',
        value: '"'
    },
    {
        key: '&apos;',
        value: '\''
    },
    {
        key: '&lt;',
        value: '<'
    },
    {
        key: '&gt;',
        value: '>'
    }
]

function printErrorsAndExit(error: ProgramError) {
    console.log(error.message)
    process.exit(error.code)
}

export function decodeHtml(line: string): string {
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
    readLineInterface.question('Enter string to decoding the HTML entities of the html string, available in version 4, back to their character representation: \n',
        (answer: string) => {
            const readLineInterface: Interface = createInterface({input, output})
            const result = decodeHtml(answer)
            printLine(result)
            readLineInterface.close()
        })
}

main()