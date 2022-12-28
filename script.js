const fileName = 'sample.bms';

const response = await fetch(fileName);
const text = await response.text();
console.log(text);

const data = [];

// HEADER FIELD


// MAIN DATA FIELD
