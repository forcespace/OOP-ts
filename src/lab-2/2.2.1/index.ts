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
    }
}

function printErrorsAndExit(error: ProgramError) {
    console.log(error.message)
    process.exit(error.code)
}

export function trimAroundString(line: String): string {
    return line.trim()
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
    readLineInterface.question('Enter string for trim: \n', (answer: string) => {
        const line = checkFullnessInputString(answer)
        const result = trimAroundString(line)
        printLine(result)
        readLineInterface.close()
    })
}

main()