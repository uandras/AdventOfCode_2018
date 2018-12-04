const fs = require("fs");

fs.readFile("./02_12/input2.txt", (err, data) => {
  if (err) {
    console.log(err.message);
  } else {
    let inputArray = data.toString("utf8").split("\n");
    console.log(inputArray.length);
    let letters = [];
    let numbers = [];
    let checksumdouble = 0;
    let checksumtreble = 0;
    let posi;
    for (let i = 0; i < inputArray.length; i++) {
      for (let j = 0; j < inputArray[i].length; j++) {
        posi = letters.indexOf(inputArray[i][j]);
        if (posi < 0) {
          letters.push(inputArray[i][j]);
          numbers.push(1);
        } else {
          numbers[posi] += 1;
        }
      } //for j
      if (numbers.indexOf(2) >= 0) {
        checksumdouble++;
      }
      if (numbers.indexOf(3) >= 0) {
        checksumtreble++;
      }
      numbers = [];
      letters = [];
    } //for i
    console.log(checksumdouble);
    console.log(checksumtreble);
    console.log(checksumdouble * checksumtreble);

    let numOfDiffs;
    let str1 = "";
    let str2 = "";
    for (let i = 0; i < inputArray.length; i++) {
      str1 = inputArray[i];
      for (let j = i + 1; j < inputArray.length; j++) {
        str2 = inputArray[j];
        numOfDiffs = 0;
        for (let k = 0; k < str1.length; k++) {
          if (str1[k] !== str2[k]) {
            numOfDiffs++;
          }
        }
        if (numOfDiffs === 1) break;
      } //for j
      if (numOfDiffs === 1) break;
    } //for i
    console.log(numOfDiffs);
    console.log(str1);
    console.log(str2);
    let str3 = "";
    for (let i = 0; i < str1.length; i++) {
      if (str1[i] === str2[i]) str3 = str3 + str1[i];
    }
    console.log(str3);
  } //else
});
