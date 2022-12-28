const fileName = 'sample.bms';
const text = (async fileName => {
    const response = await fetch(fileName);
    return await response.text();
})(fileName);

console.log(text);

const data = [];

// HEADER FIELD


// MAIN DATA FIELD
