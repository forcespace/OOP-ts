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
}

function printErrorsAndExit(error: ProgramError) {
    console.log(error.message)
    process.exit(error.code)
}

function stringToArray(value: string, separator: string = ' '): Array<string | never> {
    let result: Array<string | never> = []
    if (value !== '') {
        result = value.split(separator)
    } else {
        printErrorsAndExit(ERRORS.EMPTY_INPUT)
    }
    return result
}

function isValidNumber(value: number): boolean {
    return value < Number.MAX_SAFE_INTEGER && !isNaN(value)
}

function arrayOfStringToArrayOfNumber(values: Array<string>): Array<number> {
    return values.map((value: string) => parseFloat(value))

    // const result: Array<number | never> = []
    //
    // values.forEach(value => {
    //     const element = parseFloat(value)
    //     if (isValidNumber(element)) {
    //         result.push(element)
    //     } else {
    //         printErrorsAndExit(ERRORS.RANGE_ERROR)
    //     }
    // })
    //
    // return result
}

function getMinElementOfArray(array: Array<number>): number {
    return Math.min(...array)
}

function multipleElementsOfArrayToMin(array: Array<number>): Array<number> {
    const minElement = getMinElementOfArray(array)

    return array.map((value: number) => (value * minElement))

    // for (let i = 0; i < array.length; i++) {
    //     const result = array[i] * minElement
    //     if (isValidNumber(result)) {
    //         array[i] = result
    //     } else {
    //         printErrorsAndExit(ERRORS.RANGE_ERROR)
    //     }
    // }
    //
    // return array
}

function sortArray(array: Array<number>, order: 'ASC' | 'DESC' = 'ASC'): Array<number> {
    return array.sort((a, b) => order === 'ASC' ? a - b : b - a)
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
        console.log(sortedArray)
        readLineInterface.close()
    })
}

main()