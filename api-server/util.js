function getMinNumber(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        return {
            status: 400,
            data: { error: "Both parameters should be numbers" }
        };
    }
    return {
        status: 200,
        data: { min: Math.min(num1, num2) }
    };
}

function getMaxNumber(num1, num2) {
    if (isNaN(num1) || isNaN(num2)) {
        return {
            status: 400,
            data: { error: "Both parameters should be numbers" }
        };
    }
    return {
        status: 200,
        data: { max: Math.max(num1, num2) }
    };
}

function getAverage(numbersList) {

    if (!numbersList) {
        return {
            status: 400,
            data: { error: "Numbers parameter is required" }
        };
    }

    const numbersArray = numbersList.split(",");
    let convertedNumbers = [];

    for (let i = 0; i < numbersArray.length; i++) {
        let num = parseFloat(numbersArray[i]);
        if (isNaN(num)) {
            return {
                status: 400,
                data: { error: "Invalid number is on your numbers list" }
            };
        }
        convertedNumbers.push(num);
    }


    let sum = 0;
    for (let i = 0; i < convertedNumbers.length; i++) {
        sum += convertedNumbers[i];
    }

    let avg = sum / convertedNumbers.length;

    return {
        status: 200,
        data: { average: avg }
    };
}

function getSortedNumbers(numbersList, sortType) {

    if (!numbersList || !sortType) {
        return {
            status: 400,
            data: { error: "Numbers and sort type parameters are required" }
        };
    }

    if (sortType !== 'asc' && sortType !== 'desc') {
        return {
            status: 400,
            data: { error: "Invalid sorting type" }
        };
    }

    const numbersArray = numbersList.split(",");
    let convertedNumbers = [];

    for (let i = 0; i < numbersArray.length; i++) {
        let num = parseFloat(numbersArray[i]);
        if (isNaN(num)) {
            return {
                status: 400,
                data: { error: "Invalid number is on your numbers list" }
            };
        }
        convertedNumbers.push(num);
    }

    for (let i = 0; i < convertedNumbers.length - 1; i++) {
        for (let j = 0; j < convertedNumbers.length - 1 - i; j++) {
            if ((sortType === 'asc' && convertedNumbers[j] > convertedNumbers[j + 1]) ||
                (sortType === 'desc' && convertedNumbers[j] < convertedNumbers[j + 1])) {
                [convertedNumbers[j], convertedNumbers[j + 1]] = [convertedNumbers[j + 1], convertedNumbers[j]];
            }
        }
    }
    return {
        status: 200,
        data: { sorted: convertedNumbers.join(",") }
    };
}

function getCount(elements, search) {

    if (!elements || !search) {
        return {
            status: 400,
            data: { error: "Elements and Search parameters were required" }
        };
    }

    const elementsArray = elements.split(",");

    let count = 0;
    for (let i = 0; i < elementsArray.length; i++) {
        if (elementsArray[i] === search) {
            count++;
        }
    }
    return {
        status: 200,
        data: { OccurrenceCount: count }
    };
}

module.exports = { getMinNumber, getMaxNumber, getAverage, getSortedNumbers, getCount };