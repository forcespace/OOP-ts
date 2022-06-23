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

type WordsCount = {
    [key: string]: number
}

function printErrorsAndExit(error: ProgramError) {
    console.log(error.message)
    process.exit(error.code)
}

export function stringToArray(line: string, separator: string = ' '): Array<string> {
    let result: Array<string> = []
    if (line !== '') {
        result = line.split(separator)
    } else {
        printErrorsAndExit(ERRORS.EMPTY_INPUT)
    }

    return result
}

export function getWordsCount(value: Array<string>): WordsCount {
    let result: WordsCount = {}
    value.map(word => {
        if (!result[word]) {
            result[word] = 0
        }
        result[word] += 1
    })

    return result
}

export function arrayToString<T>(array: Array<T>, separator: string = ''): string {
    //console.log(array.join(separator))
    return array.join(separator)
}

function getObjectKeyValuePairsString<T>(object: T, separator: string = ': '): Array<string> {
    return Object.entries(object).map(([key, value]) => `${key}${separator}${value}`)
}

function printObject(object: WordsCount): void {
    const keyValuePairsString = getObjectKeyValuePairsString<WordsCount>(object)
    const line = arrayToString<string>(keyValuePairsString, '\n')
    console.log(line)
}

function main(): void {
    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.question('Enter words for calculate: \n', (answer: string) => {
        const arrayOfString = stringToArray(answer)
        const wordsCount = getWordsCount(arrayOfString)
        printObject(wordsCount)
        readLineInterface.close()
    })
}

main()