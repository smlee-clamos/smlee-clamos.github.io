const chart = [];

makeChart(`sample.bms`);

async function makeChart(fileName) {
    const res = await fetch(fileName);
    const rawData = await res.text();
    const data = rawData.split(`\n`).map(element => element.trim()).filter(element => element !== ``);
    const info = new Object();
    
    let isHeader = true;
    for (const datum of data) {
        if (datum === `*---------------------- MAIN DATA FIELD`) {
            isHeader = false;
            chart.push(info);
        }
        else {
            if (isHeader) {
                const key = datum.slice(0, datum.indexOf(` `));
                const value = datum.slice(datum.indexOf(` `) + 1);
                
                const infoCheck = [`#TITLE`, `#ARTIST`, `#BPM`, `#PLAYLEVEL`];
                if (infoCheck.includes(key))
                    info[key] = value;
            } else {
                const [key, value] = datum.split(`:`);
                console.log(`${key}: ${value}`);
            }
        }
    }
}
