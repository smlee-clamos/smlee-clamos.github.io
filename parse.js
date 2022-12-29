const fileName = `sample.bms`;
let chart = null;

readFile(fileName);

async function readFile(fileName) {
    const res = await fetch(fileName);
    const data = await res.text();
    
    chart = data.split(`\n`);
}
