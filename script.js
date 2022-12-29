makeChart(`sample.bms`);

async function makeChart(fileName) {
    const res = await fetch(fileName);
    const rawData = await res.text();
    const data = rawData.split(`\n`).map(element => element.trim()).filter(element => element !== ``);
    const chart = [];

    testFunc(data);

    // *---------------------- HEADER FIELD


    // *---------------------- MAIN DATA FIELD
}
