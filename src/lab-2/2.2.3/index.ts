import {createInterface, Interface} from 'node:readline'
import {stdin as input, stdout as output} from 'node:process'

const argv = process.argv

type ProgramError = {
    code: number;
    message: string;
}

const ERRORS = {
    EMPTY_INPUT: {
        code: 1,
        message: 'Error. Empty input.'
    },
    LESS_ARGUMENTS: {
        code: 1,
        message: 'The number of arguments is not enough.'
    },
    NO_MATCHES: {
        code: 1,
        message: 'No matches.'
    }
}

function printErrorsAndExit(error: ProgramError) {
    console.log(error.message)
    process.exit(error.code)
}

function checkCountArgs(args: Array<string>): Array<string> {
    if (args.length !== 4) {
        printErrorsAndExit(ERRORS.LESS_ARGUMENTS)
    }

    return args
}

export function checkFullnessInputString(line: string): string {
    if (line === '') {
        printErrorsAndExit(ERRORS.EMPTY_INPUT)
    }
    return line
}

export function replaceInString(line: string, searchValue: string, replaceValue: string): string {
    return line.replaceAll(searchValue, replaceValue)
}

export function printLine(line: string): void {
    console.log(line)
}

function main(argument: Array<string>): void {
    const args = checkCountArgs(argument)
    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.question('Enter string for find and replace: \n', (answer: string) => {
        const readLineInterface: Interface = createInterface({input, output})
        const findString = args[2]
        const replaceString = args[3]
        const line = checkFullnessInputString(answer)
        const result = replaceInString(line, findString, replaceString)
        printLine(result)

        readLineInterface.close()
    })
}

main(argv)