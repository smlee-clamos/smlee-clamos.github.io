fetch('sample.bms')
.then(response => response.text())
.then(text => document.getElementById('sample').innerText = text);
