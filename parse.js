const fileName = `sample.bms`;

async () => {
    const res = await fetch(fileName);
    const data = await res.text();
    console.log(data);
}