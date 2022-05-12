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

export function checkFullnessInputString(line: string): string {
    if (line === '') {
        printErrorsAndExit(ERRORS.EMPTY_INPUT)
    }
    return line
}

function printErrorsAndExit(error: ProgramError) {
    console.log(error.message)
    process.exit(error.code)
}

export function decodeHtml(line: string): string {
    let decodeLine: string
    for (const symbol of symbols) {
        decodeLine = line.replaceAll(symbol.key, symbol.value)
        line = decodeLine
    }
    return line
}

function printLine(line: string): void {
    console.log(line)
}

function main(): void {
    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.question('Enter string to decoding the HTML entities of the html string, back to their character representation: \n',
        (answer: string) => {
            const readLineInterface: Interface = createInterface({input, output})
            const line = checkFullnessInputString(answer)
            const result = decodeHtml(line)
            printLine(result)
            readLineInterface.close()
        })
}

main()