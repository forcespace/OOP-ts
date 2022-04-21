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
    },
    ERROR_INPUT: {
        code: 1,
        message: 'Error. Any input not a number'
    }
}

function printErrorsAndExit(error: ProgramError) {
    console.log(error.message)
    process.exit(error.code)
}

export function stringToArray(line: string, separator: string): Array<string> {
    let result: Array<string> = []
    if (line !== '') {
        result = line.split(separator)
    } else {
        printErrorsAndExit(ERRORS.EMPTY_INPUT)
    }
    return result
}

export function getWordsCount(value: string): string {
    const result = ''
    const splited = value.split(' ')

    

    return result
}

function printArray(result: number[]): void {
    console.log(result)
}

function main(): void {
    const separator = ' '

    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.question('Enter array of words for calculate: \n', (answer: string) => {

        readLineInterface.close()
    })
}

main()