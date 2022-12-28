const fileName = `sample.bms`;
let text = null;

(async fileName => {
    const response = await fetch(fileName);
    const result = await response.text();
    text = result;
})(fileName)
.then(() => console.log(text))
.catch(() => console.log(`failed`));