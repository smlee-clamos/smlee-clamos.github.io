Promise.all([
    fetch('sample.txt').then(x => x.text()),
  ]).then(([sampleResp]) => {
    console.log(sampleResp);
  });