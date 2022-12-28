const fileName = 'sample.bms';
const text = [];

(async fileName => {
    const response = await fetch(fileName);
    const result = await response.text();
    text.push(result);
    console.log(result);
})(fileName);

console.log("//////////////////////////////////////");
console.log(text[0]);

const data = [];

// HEADER FIELD


// MAIN DATA FIELD

