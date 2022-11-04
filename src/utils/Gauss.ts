interface IGaussPoint {
    x: number;
    y: number;
}

interface IGaussDistribution {
    gaussArray: IGaussPoint[];
    standardDeviation: number;
    dispersion: number;
    length: number;
    mathExpectation: number;
}

const getRandomInt = (min: number, max: number): number => min + Math.floor(Math.random() * (max - min + 1));

const getArrayRandomNumber = (min: number, max: number, length: number) => {
    let arr: number[] = [];
    for (let i = 1; i <= length; i++) {
        arr.push(getRandomInt(min, max));
    }
    return arr;
};

const getMathExpectation = (arr: Array<number>): number => arr.reduce((prev, curr) => (prev += curr)) / arr.length;

const getDispersion = (arr: Array<number>): number =>
    arr.reduce((prev, curr) => (prev += Math.abs(curr - getMathExpectation(arr)))) / arr.length;

const getStandardDeviation = (arr: Array<number>) => getDispersion(arr) ** 0.5;

const gaussFunction = (x: number, mathExpection: number, standardDeviation: number): number =>
    (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) *
    Math.exp(-0.5 * ((x - mathExpection) / standardDeviation) ** 2);

export const getGaussDistribution = (length: number, minValue: number, maxValue: number): IGaussDistribution => {
    let arr = getArrayRandomNumber(minValue, maxValue, length),
        mathExpectation = getMathExpectation(arr),
        dispersion = getDispersion(arr),
        standardDeviation = getStandardDeviation(arr),
        gaussArray: IGaussPoint[] = [];
    for (let elem of arr) {
        gaussArray.push({
            x: elem,
            y: gaussFunction(elem, mathExpectation, standardDeviation),
        });
    }
    return {
        gaussArray: gaussArray.sort((a, b) => a.x - b.x),
        standardDeviation,
        dispersion,
        mathExpectation,
        length,
    };
};
