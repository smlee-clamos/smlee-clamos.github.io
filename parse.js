const chart = [];

makeChart(`sample.bms`);

async function makeChart(fileName) {
    const res = await fetch(fileName);
    const rawData = await res.text();
    const data = rawData.split(`\n`).map(element => element.trim()).filter(element => element !== ``);

    let isHeader = true;
    for (const datum of data) {
        if (datum === `*---------------------- HEADER FIELD`) {
            // Start Header Field
            const obj = {};
            chart.push(obj);
        } else if (isHeader) {
            // Parse Header Field
            const key = datum.slice(1, datum.indexOf(` `));
            const value = datum.slice(datum.indexOf(` `) + 1);
            
            if ([`TITLE`, `ARTIST`, `BPM`, `PLAYLEVEL`].includes(key)) {
                chart[0][key] = value;
            }
        } else if (datum === `*---------------------- MAIN DATA FIELD`) {
            // Start Main Data Field
            isHeader = false;
        } else {
            // Parse Main Data Field
            const [key, value] = datum.split(`:`);
            const measure = Number(key.slice(1, 4));
            const lane = key.slice(4);

            if (!chart[measure]) {
                const obj = {};
                chart.push(obj);
            }
            
            chart[measure][lane] = value;
        }
    }
}
