const fileName = 'sample.bms';
const text = readFile(fileName);

console.log(text);

const data = [];

// HEADER FIELD


// MAIN DATA FIELD


async function readFile(fileName) {
    const response = await fetch(fileName);
    return await response.text();
}