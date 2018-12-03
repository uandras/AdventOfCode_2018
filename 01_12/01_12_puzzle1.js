const fs = require("fs");

fs.readFile("./01_12/input1.txt", (err, data) => {
  if (err) {
    console.log(err.message);
  } else {
    let freq = 0;
    const inputArray = data.toString("utf8").split("\n");
    for (let i = 0; i < inputArray.length; i++) {
      freq += Number(inputArray[i]);
    }
    console.log(freq);
    freq = 0;
    let firstSecondFreq;
    let foundSecond = false;
    let outputArray = [];
    while (!foundSecond) {
      for (let i = 0; i < inputArray.length; i++) {
        freq += Number(inputArray[i]);
        if (!foundSecond) {
          if (outputArray.indexOf(freq) >= 0) {
            foundSecond = true;
            firstSecondFreq = freq;
            break;
          } else {
            outputArray.push(freq);
          }
        }
      }
    }
    console.log(firstSecondFreq);
  }
});
