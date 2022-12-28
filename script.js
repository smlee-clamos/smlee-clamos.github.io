const fileName = 'sample.bms';
var text = null;

(async fileName => {
    const response = await fetch(fileName);
    const result = await response.text();
    text = result;
})(fileName);

console.log(text);

const data = [];

if (text) {
    console.log('it is not null.');
} else {
    console.log('it is null.');
}

// HEADER FIELD


// MAIN DATA FIELD

