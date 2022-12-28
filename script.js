const fileName = 'sample.bms';
const text = readFile(fileName);

console.log(text);

const data = [];

// HEADER FIELD


// MAIN DATA FIELD


async function readFile(fileName) {
    const response = await fetch(fileName);
    const result = await response.text();
    console.log(result);
    return result;
}