import {createInterface, Interface} from 'node:readline'
import {stdin as input, stdout as output} from 'node:process'

function trimAroundString(value: String): string {
    return value.trim()
}

function main(): void {
    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.question('Enter string for trim: \n', (answer: string) => {
        const result = trimAroundString(answer)
        console.log(result)
        readLineInterface.close()
    })
}

main()