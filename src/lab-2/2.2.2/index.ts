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
}

function printErrorsAndExit(error: ProgramError) {
    console.log(error.message)
    process.exit(error.code)
}

function trimString(value: String): string {
    return value.replace(/\s+/g, ' ').trim()
}

function main(): void {
    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.question('Enter string for trim: \n', (answer: string) => {
        if (answer === '') {
            printErrorsAndExit(ERRORS.EMPTY_INPUT)
        }
        const result = trimString(answer)
        console.log(result)
        readLineInterface.close()
    })
}

main()