let response = await fetch('sample.txt');
let text = await response.text();
console.log(text);

// Promise.all([
//     fetch('sample.txt').then(x => x.text()),
//   ]).then(([sampleResp]) => {
//     console.log(sampleResp);
//   });