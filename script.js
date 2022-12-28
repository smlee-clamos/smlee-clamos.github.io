const fileName = 'sample.bms';
let text = null;

fetch(fileName)
.then(response => response.text())
.then(result => text = result);

// (async fileName => {
//     const response = await fetch(fileName);
//     const result = await response.text();
//     console.log(result);
// })(fileName);

console.log(text);

const data = [];

// HEADER FIELD


// MAIN DATA FIELD

