const fs = require("fs");
//const fs2 = require("fs");

function doBubbleSort(param1) {
  let date1;
  let date2;
  let str1;
  let datevalues;
  let timevalues;
  let helpparam;

  for (let i = param1.length - 2; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      str1 = param1[j].slice(1, param1[j].indexOf("]"));
      datevalues = str1.split(" ")[0].split("-");
      timevalues = str1.split(" ")[1].split(":");
      date1 = new Date(
        Date.UTC(
          datevalues[0],
          datevalues[1] - 1,
          datevalues[2],
          timevalues[0],
          timevalues[1],
          0,
          0
        )
      );
      str1 = param1[j + 1].slice(1, param1[j + 1].indexOf("]"));
      datevalues = str1.split(" ")[0].split("-");
      timevalues = str1.split(" ")[1].split(":");
      date2 = new Date(
        Date.UTC(
          datevalues[0],
          datevalues[1] - 1,
          datevalues[2],
          timevalues[0],
          timevalues[1],
          0,
          0
        )
      );
      //console.log(date1);
      //console.log(date2);
      if (date1 > date2) {
        helpparam = param1[j];
        param1[j] = param1[j + 1];
        param1[j + 1] = helpparam;
      }
    } //for j
  } //for i
  return param1;
} //function doBubbleSort

fs.readFile("./04_12/input4.txt", "utf8", (err, data) => {
  if (err) console.log(err.message);
  else {
    let guardShift = data.toString().split("\r\n");
    /*
    for (let i = 0; i < guardShift.length; i++) {
      fs2.appendFileSync("./04_12/guardshift1.txt", guardShift[i] + "\r\n");
    }
*/
    //sorting with bubblesort
    guardShift = doBubbleSort(guardShift);

    /*
    for (let i = 0; i < guardShift.length; i++) {
      fs2.appendFileSync("./04_12/guardshift2.txt", guardShift[i] + "\r\n");
    }
*/

    //counting the sleeping minutes with object
    let actualGuard = -1; //id of actual guard
    let actualGuardPosition = -1;
    let guards = [];
    let aktSleepOfGuards = [];
    let sleepOfGuards = []; //collection of sleep data of the guards
    let wakeUpMinute = -1; //actual guard wake up time (minute only)
    let fallAsleepMinute = -1; //actual guard wake up time (minute only)
    //*************************
    //*** filling up the shifts
    //*************************
    for (let i = 0; i < guardShift.length; i++) {
      if (guardShift[i].indexOf("begins") >= 0)
        actualGuard = Number(
          guardShift[i].slice(
            guardShift[i].indexOf("#") + 1,
            guardShift[i].indexOf("begins")
          )
        );
      if (guardShift[i].indexOf("falls asleep") >= 0) {
        fallAsleepMinute = Number(
          guardShift[i].slice(
            guardShift[i].indexOf(":") + 1,
            guardShift[i].indexOf("]")
          )
        );
      }
      if (guardShift[i].indexOf("wakes up") >= 0) {
        wakeUpMinute = Number(
          guardShift[i].slice(
            guardShift[i].indexOf(":") + 1,
            guardShift[i].indexOf("]")
          )
        );
        actualGuardPosition = guards.indexOf(actualGuard);
        if (actualGuardPosition >= 0) {
          for (let j = 0; j < 60; j++) {
            if (j >= fallAsleepMinute && j < wakeUpMinute)
              sleepOfGuards[actualGuardPosition][j] += 1;
          }
        } else {
          guards.push(actualGuard);
          aktSleepOfGuards = [];
          for (let j = 0; j < 60; j++) {
            if (j >= fallAsleepMinute && j < wakeUpMinute)
              aktSleepOfGuards.push(1);
            else aktSleepOfGuards.push(0);
          }
          sleepOfGuards.push([...aktSleepOfGuards]);
        } //if-else guards.indexof
      }
    } //for i

    //*********************************
    //*** finding the most sleepy guard
    //*********************************
    let minutesOfSleep = 0;
    let tempMinutes = 0;
    let sleepiestGuard = -1;
    for (let i = 0; i < sleepOfGuards.length; i++) {
      tempMinutes = 0;
      for (let j = 0; j < 60; j++) {
        tempMinutes += sleepOfGuards[i][j];
      } //for j
      if (tempMinutes > minutesOfSleep) {
        minutesOfSleep = tempMinutes;
        sleepiestGuard = guards[i];
      }
    } //for i
    //*********************************************************
    //*** finding the sleepiest minute of the most sleepy guard
    //*********************************************************
    let sleepiestMinute = 0;
    minutesOfSleep = 0;
    for (let i = 0; i < 60; i++) {
      tempMinutes = sleepOfGuards[guards.indexOf(sleepiestGuard)][i];
      if (tempMinutes > minutesOfSleep) {
        minutesOfSleep = tempMinutes;
        sleepiestMinute = i;
      }
    }
    console.log("Sleepiest guard: ", sleepiestGuard);
    console.log("Most sleeped minute: ", sleepiestMinute);
    console.log("Multiplication: ", sleepiestGuard * sleepiestMinute);

    //*********************************************************
    //*** finding the most slept minute and the guard
    //*********************************************************
    let tempstr = "";
    for (let i = 0; i < 59; i++) {
      if (i < 10) tempstr += "Min0" + i.toString() + ",";
      else tempstr += "Min" + i.toString() + ",";
    }

    /*
    fs2.appendFile("./04_12/guards.txt", "GuardID" + "\r\n", err => {
      if (err) throw err;
    });
    for (let i = 0; i < guards.length; i++) {
      fs2.appendFile("./04_12/guards.txt", guards[i] + "\r\n", err => {
        if (err) throw err;
      });
    }

    fs2.writeFile("./04_12/result4.txt", "GuardID," + tempstr + "\r\n", err => {
      if (err) throw err;
    });
*/
    for (let i = 0; i < guards.length; i++) {
      tempstr = "";
      for (let j = 0; j < 59; j++) {
        tempstr += sleepOfGuards[i][j].toString() + ",";
      }
      tempstr = guards[i] + "," + tempstr + "\r\n";
      /*
      fs2.appendFile("./04_12/result4.txt", tempstr, err => {
        if (err) throw err;
      });
*/
    }

    let tempMinutes2 = -1;
    let sleepiestMinute2 = -1;
    let sleepiestGuard2 = -1;
    for (let i = 0; i < 60; i++) {
      for (let j = 0; j < sleepOfGuards.length; j++) {
        if (sleepOfGuards[j][i] > tempMinutes2) {
          tempMinutes2 = sleepOfGuards[j][i];
          sleepiestMinute2 = i;
          sleepiestGuard2 = guards[j];
        }
      }
    }
    console.log("Most slept minute: ", sleepiestMinute2);
    console.log("How many: ", tempMinutes2);
    console.log("For the guard: ", sleepiestGuard2);
    console.log("Multiplication: ", sleepiestMinute2 * sleepiestGuard2);
  }
});
