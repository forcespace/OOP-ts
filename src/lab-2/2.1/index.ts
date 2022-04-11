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

export function stringToArray(value: string, separator: string): Array<string> {
    let result: Array<string> = []
    if (value !== '') {
        result = value.split(separator)
    } else {
        printErrorsAndExit(ERRORS.EMPTY_INPUT)
    }
    return result
}

export function arrayOfStringToArrayOfNumber(values: Array<string>): Array<number> {
    return values.map((value: string) => parseFloat(value))
}

export function getMinElementOfArray(array: Array<number>): number {
    return Math.min(...array)
}

export function multipleElementsOfArrayToMin(array: Array<number>): Array<number> {
    const minElement = getMinElementOfArray(array)

    return array.map((value: number) => (
        value * minElement
    ))
}

export function sortArray(array: Array<number>, order: 'ASC' | 'DESC' = 'ASC'): Array<number> {
    return array.sort((a, b) => order === 'ASC' ? a - b : b - a)
}

function printArray(result: number[]): void {
    console.log(result)
}

function main(): void {
    const separator = ' '
    const typeOfSort = 'ASC'

    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.question('Enter array of number for multiple: \n', (answer: string) => {
        const arrayOfString = stringToArray(answer, separator)
        const arrayOfNumber = arrayOfStringToArrayOfNumber(arrayOfString)
        const multipliedArray = multipleElementsOfArrayToMin(arrayOfNumber)
        const sortedArray = sortArray(multipliedArray, typeOfSort)
        printArray(sortedArray)
        readLineInterface.close()
    })
}

main()