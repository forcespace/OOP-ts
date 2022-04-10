import {createInterface, Interface} from 'node:readline'
import {stdin as input, stdout as output} from 'node:process'

type ProgramError = {
    code: number;
    message: string;
}

const ERRORS = {
    OTHER_ERROR: {
        code: 123,
        message: "!!"
    }
};

function printErrorsAndExit(error: ProgramError) {
    console.log(error.message);
    process.exit(error.code);
}

function stringToArray(value: string, separator: string = " "): Array<string | never> {
    let result: Array<string | never> = [];
    if (value !== "") {
        result = value.split(separator);
    }
    return result;
}

function isValidNumber(v: number): boolean {
    return v < Number.MAX_SAFE_INTEGER && !isNaN(v);
}

function arrayOfStringToArrayOfNumber(values: Array<string>): Array<number> {
    // return values.map((value: string) => parseFloat(value));

    const result: Array<number | never> = [];

    values.forEach(value => {
        const element = parseFloat(value);
        if (isValidNumber(element)) {
            result.push(element);
        }
        else {
            printErrorsAndExit(ERRORS.OTHER_ERROR);
        }
    })

    return result;
}

function getMinElementOfArray(array: Array<number>): number {
    return Math.min(...array);
}

function multipleElementsOfArrayToMin(array: Array<number>): Array<number> {
    const minElement = getMinElementOfArray(array);

    // return array.map((value: number) => (value * minElement));

    for (let i = 0; i < array.length; i++) {
        const temp = array[i] * minElement;
        if (isValidNumber(temp)) {
            array[i] = temp;
        }
        else {
            printErrorsAndExit(ERRORS.OTHER_ERROR);
        }
    }

    return array;
}

function sortArray(array: Array<number>, order: "ASC" | "DESC" = "ASC"): Array<number> {
    return array.sort((a, b) => order === "ASC" ? a - b : b - a)
}

function main(): void {
    const separator = " ";
    const typeOfSort = "ASC";

    const readLineInterface: Interface = createInterface({input, output})
    readLineInterface.question('Hi: \n', (answer: string) => {
        const arrayOfString = stringToArray(answer, separator);
        const arrayOfNumber = arrayOfStringToArrayOfNumber(arrayOfString);

        // const multipliedArray = multipleElementsOfArrayToMin(arrayOfNumber);
        // console.log(multipliedArray);

        multipleElementsOfArrayToMin(arrayOfNumber);
        sortArray(arrayOfNumber, typeOfSort);

        console.log(arrayOfNumber);
        // readLineInterface.write(arrayOfNumber.join(" "));
        readLineInterface.close();
    });


}

main();