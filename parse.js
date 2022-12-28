const fileName = `sample.bms`;

makeChart(fileName);

async function makeChart(fileName) {
    const res = await fetch(fileName);
    const data = await res.text();
    console.log(data);
}