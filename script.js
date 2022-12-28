const fileName = 'sample.bms';
const text = readFile(fileName);
const data = [];

// HEADER FIELD


// MAIN DATA FIELD


async function readFile(fileName) {
    const response = await fetch(fileName);
    const text = await response.text();
    console.log(text);
    return text;
}