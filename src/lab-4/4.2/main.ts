import {createInterface, Interface} from 'node:readline'
import {stdin as input, stdout as output} from 'process'
import {ShapeHandler, ShapeNamesTypes} from './ShapeHandler'

const MESSAGE_INVALID_INPUT = 'Invalid value in input. String should be like: rectangle 10.3 20.15 30.7 40.4 ff0000 00ff00'
const MAX_AREA_SHAPE = 'Max area shape: '
const MIN_PERIMETER_SHAPE = 'Min perimeter shape: '
const IMAGE_PATH = 'Created image: ./image.png'

function main(): void {
    const shapeInterface: ShapeHandler = new ShapeHandler()
    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.on('line', (line: string) => {
        if (isWrongLine(line)) {
            printMessage(MESSAGE_INVALID_INPUT)
        }
        /*try catch продолжать считывание*/
        try {
            shapeInterface.addShape(line)
        } catch (error) {
            printMessage(error.message)
        }
    }).on('close', () => {
        const maxAreaShape: string = shapeInterface.getMaxAreaShape()
        printMessage(`${MAX_AREA_SHAPE}${maxAreaShape}`)

        const minPerimeterShape: string = shapeInterface.getMinPerimeterShape()
        printMessage(`${MIN_PERIMETER_SHAPE}${minPerimeterShape}`)

        shapeInterface.createImage()
        printMessage(IMAGE_PATH)

        readLineInterface.close()
    })
}

function printMessage(message: string) {
    console.log(message)
}


function isWrongLine(line: string): boolean {
    if (!line) {
        return true
    }

    const lineArray: string[] = line.split(' ')

    return !isShapeDescriptionCorrect(lineArray)
}

function isShapeDescriptionCorrect(lineArray: string[]): boolean {
    switch (lineArray[0]) {
        case ShapeNamesTypes.RECTANGLE: {
            return isRectangleDescriptionCorrect(lineArray)
        }
        case ShapeNamesTypes.TRIANGLE: {
            return isTriangleDescriptionCorrect(lineArray)
        }
        case ShapeNamesTypes.CIRCLE: {
            return isCircleDescriptionCorrect(lineArray)
        }
        case ShapeNamesTypes.LINE_SEGMENT: {
            return isLineDescriptionCorrect(lineArray)
        }
        default: {
            return false
        }
    }
}

function isRectangleDescriptionCorrect(lineArray: string[]) {
    if (lineArray.length < 6 && lineArray.length > 7) {
        return false
    }
    let isErrorFound = false
    for (const [index, lineItem] of lineArray.entries()) {
        if (index > 0 && index < 5) {
            isErrorFound = isNotNumber(lineItem)
        }
        if (index > 5) {
            isErrorFound = isNotColor(lineItem)
        }
        if (isErrorFound) {
            return false
        }
    }
    return !isErrorFound
}

function isTriangleDescriptionCorrect(lineArray: string[]) {
    if (lineArray.length != 8 && lineArray.length != 9) {
        return false
    }
    let isErrorFound = false
    for (const [index, lineItem] of lineArray.entries()) {
        if (index > 0 && index < 6) {
            isErrorFound = isNotNumber(lineItem)
        }
        if (index > 6) {
            isErrorFound = isNotColor(lineItem)
        }
        if (isErrorFound) {
            return false
        }
    }

    isErrorFound = isNotCorrectTriangle(lineArray)
    return !isErrorFound
}

function isNotCorrectTriangle(lineItem: string[]): boolean {
    if (lineItem[0] === lineItem [2] && lineItem[0] === lineItem [4]) {
        return true
    }
    return lineItem[1] === lineItem [3] && lineItem[1] === lineItem [5];
}

function isCircleDescriptionCorrect(lineArray: string[]) {
    if (lineArray.length != 5 && lineArray.length != 6) {
        return false
    }
    let isErrorFound = false
    for (const [index, lineItem] of lineArray.entries()) {
        if (index > 0 && index < 4) {
            isErrorFound = isNotNumber(lineItem)
        }
        if (index > 4) {
            isErrorFound = isNotColor(lineItem)
        }
        if (isErrorFound) {
            return false
        }
    }

    return !isErrorFound
}

function isLineDescriptionCorrect(lineArray: string[]) {
    if (lineArray.length != 6) {
        return false
    }
    let isErrorFound = false
    for (const [index, lineItem] of lineArray.entries()) {
        if (index > 0 && index < 5) {
            isErrorFound = isNotNumber(lineItem)
        }
        if (index > 5) {
            isErrorFound = isNotColor(lineItem)
        }
        if (isErrorFound) {
            return false
        }
    }

    return true
}

function isNotNumber(lineItem: string): boolean {
    return Boolean(lineItem.match(/[^0-9.-]/))
}

function isNotColor(lineItem: string) {
    return Boolean(lineItem.match(/[^0-9a-f]/)) && lineItem.length === 6
}

main()