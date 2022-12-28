fetch('sample.txt')
.then(response => response.text())
.then(text => console.log(text));

// Promise.all([
//     fetch('sample.txt').then(x => x.text()),
//   ]).then(([sampleResp]) => {
//     console.log(sampleResp);
//   });