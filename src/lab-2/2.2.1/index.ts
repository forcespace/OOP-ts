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

function trimAroundString(value: String): string {
    return value.trim()
}

function main(): void {
    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.question('Enter string for trim: \n', (answer: string) => {
        if (answer === '') {
            printErrorsAndExit(ERRORS.EMPTY_INPUT)
        }
        const result = trimAroundString(answer)
        console.log(result)
        readLineInterface.close()
    })
}

main()