const process = require("process")
const argv = process.argv;

type ProgramError = {
    code: number;
    message: string;
}

const ERRORS = {
    LESS_ARGUMENTS: {
        code: 123,
        message: "Мало аргументов"
    },
    OTHER_ERROR: {
        code: 123,
        message: "Мало аргументов"
    }
};

 function printErrorsAndExit(error: ProgramError) {
    console.log(error.message);
    process.exit(error.code);
}

 function parseArgs(args: Array<string>): string | never {
    if (args.length < 3) {
        printErrorsAndExit(ERRORS.LESS_ARGUMENTS);
    }

    return args[2];
}

function stringToArray(value: string, separator: string = " "): Array<string | never> {
    let result: Array<string | never> = [];
    if (value !== "") {
        result = value.split(separator);
    }
    return result;
}

function arrayOfStringToArrayOfNumber(values: Array<string>): Array<number> {
    // return values.map((value: string) => parseFloat(value));

    const result: Array<number | never> = [];

    values.forEach(value => {
        const element = parseFloat(value);
        if (!isNaN(element)) {
            result.push(element);
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
        array[i] *= minElement;
    }

    return array;
}

function sortArray(array: Array<number>, order: "ASC" | "DESC" = "ASC"): Array<number> {
    return array.sort((a, b) => order === "ASC" ? a - b : b - a)
}

function main(arguments2: Array<string>): void {
    const separator = " ";
    const typeOfSort = "DESC";

    const args = parseArgs(arguments2);
    const arrayOfString = stringToArray(args, separator);
    const arrayOfNumber = arrayOfStringToArrayOfNumber(arrayOfString);

    // const multipliedArray = multipleElementsOfArrayToMin(arrayOfNumber);
    // console.log(multipliedArray);

    multipleElementsOfArrayToMin(arrayOfNumber);
    sortArray(arrayOfNumber, typeOfSort);
    console.log(arrayOfNumber);

    process.exit();
}

main(argv);

 export {
     parseArgs
}