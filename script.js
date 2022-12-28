const fileName = 'sample.bms';
const text = (async (fileName) => {
    const response = await fetch(fileName);
    const result = await response.text();
    return result;
})(fileName);

console.log(text);

const data = [];

// HEADER FIELD


// MAIN DATA FIELD


