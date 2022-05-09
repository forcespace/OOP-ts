import {createInterface, Interface} from 'node:readline'
import {stdin as input, stdout as output} from 'node:process'
import fs from 'fs'

const argv = process.argv

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

function checkCountArgs(args: Array<string>): Array<string> {
    if (args.length !== 3) {
        printErrorsAndExit(ERRORS.EMPTY_INPUT)
    }

    return args
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

function isInSet(word: string, dictionary: Set<string>): boolean {
    return dictionary.has(word)
}

function arrayToSet<T>(array: Array<T>): Set<T> {
    return new Set<T>(array)
}

async function isFileExist(filename: string): Promise<boolean> {
    return await fs.promises.stat(filename).then(()=> true).catch(e => false)
}

async function readFile(filename: string): Promise<Promise<string> | void> {
    if (isFileExist(filename)) {
        // const data = await fs.readFile(filename, 'binary')
        return 'test hui test'
    }
    else {
        printErrorsAndExit(ERRORS.EMPTY_INPUT)
    }
}

function stringToSet(line: string): Set<string> {
    const arrayOfString = stringToArray(line)
    return arrayToSet(arrayOfString)
}

function filter<T>(array: Array<T>, fn: (item: T) => boolean): Array<T> {
    return array.filter(fn)
}

function makeDictionaryFilter(dictionary: Set<string>) {
    return (word: string) => !isInSet(word, dictionary)
}

function printArray(result: string[]): void {
    console.log(result)
}

function main(argument: Array<string>): void {
    // const args = checkCountArgs(argument)
    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.question('Enter string of words for filter: \n', async (answer: string) => {
        const arrayOfString = stringToArray(answer)
        // const dictionaryFileName = args[2]
        const dictionaryFileContent = 'test hui test'
        const dictionary = stringToSet(dictionaryFileContent)
        const dictionaryFilter = makeDictionaryFilter(dictionary)
        const filtered = filter(arrayOfString, dictionaryFilter)
        printArray(filtered)
        readLineInterface.close()
    })
}

main(argv)