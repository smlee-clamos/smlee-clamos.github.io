const fileName = 'sample.bms';
const text = async fileName => {
    const response = await fetch(fileName);
    const text = await response.text();
    console.log(text);
    return text;
}

const data = [];

// HEADER FIELD


// MAIN DATA FIELD
