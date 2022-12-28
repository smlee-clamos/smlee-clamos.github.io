const fileName = `sample.bms`;
const answer = [];

fetch(fileName)
.then(response => response.text())
.then(rawData => {
    for (let i = 0; i < 10; i++) {
        answer.push(i);
    }
    // HEADER FIELD


    // MAIN DATA FIELD


});

console.log(answer);