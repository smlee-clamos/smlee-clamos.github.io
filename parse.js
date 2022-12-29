const fileName = `sample.bms`;
const chart = null;

readFile(fileName);

async function readFile(fileName) {
    const res = await fetch(fileName);
    const rawData = await res.text();
    const data = rawData.split(`\n`).map(element => element.trim()).filter(element => element !== ``);
    console.log(data);

    // *---------------------- HEADER FIELD

    
    // *---------------------- MAIN DATA FIELD
}
