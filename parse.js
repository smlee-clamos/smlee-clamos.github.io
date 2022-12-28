const fileName = `sample.bms`;

readFile(fileName);

async function readFile(fileName) {
    const res = await fetch(fileName);
    const data = await res.text();
    
    makeChart(data);
}

function makeChart(data) {
    console.log(data);
}