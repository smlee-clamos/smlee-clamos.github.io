const fileName = `sample.bms`;

fetch(fileName)
.then(response => response.text())
.then(result => {
    console.log(result);

    // HEADER FIELD


    // MAIN DATA FIELD


})
.catch(console.log(`fetch error`));
