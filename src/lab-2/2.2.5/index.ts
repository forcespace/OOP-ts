import {createInterface, Interface} from 'node:readline'
import {stdin as input, stdout as output} from 'node:process'

type ProgramError = {
    code: number;
    message: string;
}

const ERRORS = {
    RANGE_ERROR: {
        code: 1,
        message: 'Error. Value very big.'
    },
    EMPTY_INPUT: {
        code: 1,
        message: 'Error. Empty input.'
    }
}

function printErrorsAndExit(error: ProgramError) {
    console.log(error.message)
    process.exit(error.code)
}

export function checkFullnessInputString(line: string): string {
    if (line === '') {
        printErrorsAndExit(ERRORS.EMPTY_INPUT)
    }
    return line
}

export function printLine(line: string): void {
    console.log(line)
}

function main(): void {
    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.question('Enter HTML symbols for HTML Decode : \n', (answer: string) => {

        readLineInterface.close()
    })
}

main()