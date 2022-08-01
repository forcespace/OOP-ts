import {createInterface, Interface} from 'node:readline'
import {stdin as input, stdout as output} from 'process'
import {ShapeHandler} from './ShapeHandler'

const Message = {
    MAX_AREA_SHAPE: 'Max area shape: ',
    MIN_PERIMETER_SHAPE: 'Min perimeter shape: '
}

function printLine(message: string) {
    console.log(message)
}

function main(): void {
    const shapeInterface: ShapeHandler = new ShapeHandler()
    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.on('line', (message: string) => {
        shapeInterface.addShape(message)
    }).on('close', () => {
        const maxAreaShape: string = shapeInterface.getMaxAreaShape()
        printLine(`${Message.MAX_AREA_SHAPE}${maxAreaShape}`)
        printLine('--------------------------------')
        const minPerimeterShape: string = shapeInterface.getMinPerimeterShape()
        printLine(`${Message.MIN_PERIMETER_SHAPE}${minPerimeterShape}`)
        printLine('--------------------------------')
        readLineInterface.close()
    })
}

main()