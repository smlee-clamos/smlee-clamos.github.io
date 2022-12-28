fetch('sample.txt')
.then(response => response.text())
.then(text => document.getElementById('sample').innerText = text);
