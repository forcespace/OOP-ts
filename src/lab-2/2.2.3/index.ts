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
        message: 'Args so bad.'
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

function parseArgs(args: Array<string>): Array<string> {
    if (args.length !== 4) {
        printErrorsAndExit(ERRORS.LESS_ARGUMENTS)
    }

    return args
}

// function getPositionInString(inputLine: string, searchLine: string): number {
//     return inputLine.search(searchLine)
// }

function checkFullnessInputString(inputLine: string): string {
    if (inputLine === '') {
        printErrorsAndExit(ERRORS.EMPTY_INPUT)
    }
    return inputLine
}

function replaceInString(inputLine: string, searchValue: string, replaceValue: string): string {
    return inputLine.replace(searchValue, replaceValue)
}

function main(arguments2: Array<string>): void {
    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.question('Enter string for find and replace: \n', (answer: string) => {
        const args = parseArgs(arguments2)
        const readLineInterface: Interface = createInterface({input, output})
        const findString = args[2]
        const replaceString = args[3]
        const line = checkFullnessInputString(answer)
        const result = replaceInString(line, findString, replaceString)
        console.log(result)

        readLineInterface.close()
    })
}

main(argv)