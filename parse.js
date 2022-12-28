const fileName = `wrongfile.bms`;

fetch(fileName)
.then(response => response.text())
.then(result => {
    console.log(result);

    // HEADER FIELD


    // MAIN DATA FIELD


})
.catch(err => console.log(err));
