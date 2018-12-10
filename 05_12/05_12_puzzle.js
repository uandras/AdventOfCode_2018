/*
forrás, target polimer (array)
1 karakter átmegy a target-be
Ciklus: amíg van valami a forrásban:
	forrás első mozgat target utolsó
	target két utolsó vizsgál, ha kell akkor töröl
Target hossz kiiratás
*/

var fs = require("fs");

fs.readFile("./05_12/input5.txt", "utf8", (err, data) => {
  if (err) console.log(err.message);
  else {
    let inputData;
    let outputData = [];
    let unit;
    let inputLength; //it's needed, because inputData.length changes with splice...
    inputData = data.toString().split("");
    console.log(inputData.length, inputData[0], inputData[1]);
    inputLength = inputData.length;
    for (let i = 0; i < inputLength; i++) {
      unit = inputData[0];
      inputData.splice(0, 1);
      outputData.push(unit);
      if (
        outputData.length > 1 &&
        outputData[outputData.length - 1] !==
          outputData[outputData.length - 2] &&
        outputData[outputData.length - 1].toUpperCase() ===
          outputData[outputData.length - 2].toUpperCase()
      ) {
        outputData.splice(outputData.length - 2, 2);
      }
    } //for i
    console.log("Output length: ", outputData.length);
    console.log("Input length: ", inputData.length);

    //part 2
    const units = [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ];
    console.log(units.length);
    let minlength = 50000; //the max input size
    for (let i = 0; i < units.length; i++) {
      inputData = data.toString().split("");
      outputData = [];
      inputLength = inputData.length;
      //first we delete the actual unit from input
      for (let j = 0; j < inputLength; j++) {
        unit = inputData[0];
        inputData.splice(0, 1);
        if (unit.toLowerCase() !== units[i]) outputData.push(unit);
      } //for i
      //now output is the new input...:-)
      inputData = [];
      inputLength = outputData.length;
      for (let j = 0; j < inputLength; j++) {
        unit = outputData[0];
        outputData.splice(0, 1);
        inputData.push(unit);
        if (
          inputData.length > 1 &&
          inputData[inputData.length - 1] !== inputData[inputData.length - 2] &&
          inputData[inputData.length - 1].toUpperCase() ===
            inputData[inputData.length - 2].toUpperCase()
        ) {
          inputData.splice(inputData.length - 2, 2);
        }
      } //for j
      console.log(inputData.length);
      if (inputData.length < minlength) minlength = inputData.length;
    } //for i
    console.log("Minimal length: ", minlength);
  } //if-else fs.readFile
});
