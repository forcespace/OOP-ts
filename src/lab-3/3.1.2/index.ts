import {createInterface, Interface} from 'node:readline'
import {stdin as input, stdout as output} from 'process'
import {Car} from './Car'
import {CarController} from './CarController'

const MESSAGE_WELCOME_INPUT = 'Start app. Help:\n' +
    'Info. Displays engine status, driving direction, speed and gear\n' +
    'EngineOn. Turns on your engine\n' +
    'EngineOff. Turns off your engine\n' +
    'SetGear <-1...5>. Activates the specified gear, specified by a number from -1 to 5.\n' +
    'SetSpeed <speed>. Sets the specified movement speed, given by a non-negative number.\n' +
    'Exit. To exit from app'

function printLine(line: string): void {
    console.log(line)
}

function parseCommand(line: string) {
    const [command, value] = line.split(' ')
    return {command, value}
}

function main(): void {
    const car = new Car()
    const carController = new CarController(car)
    printLine(MESSAGE_WELCOME_INPUT)
    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.on('line', (line: string) => {
        const {command, value} = parseCommand(line)

        if (command === 'Exit') {
            return readLineInterface.close()
        }

        console.log(carController.executeCommand(command, value))
    })
}

main()