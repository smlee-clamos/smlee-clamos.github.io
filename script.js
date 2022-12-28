const fileName = 'sample.bms';
let text;

(async fileName => {
    const response = await fetch(fileName);
    const result = await response.text();
    text = result;
    console.log(result);
})(fileName);

console.log("//////////////////////////////////////");
console.log(text);

const data = [];

// HEADER FIELD


// MAIN DATA FIELD

