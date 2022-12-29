makeChart(`sample.bms`);

async function makeChart(fileName) {
    console.log(1);

    const res = await fetch(fileName);
    const rawData = await res.text();
    const data = rawData.split(`\n`).map(element => element.trim()).filter(element => element !== ``);
    const chart = [];

    console.log(data);

    console.log(2);
    // *---------------------- HEADER FIELD


    // *---------------------- MAIN DATA FIELD
}
