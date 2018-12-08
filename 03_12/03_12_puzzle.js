const fs = require("fs");
//const fs2 = require("fs");

fs.readFile("./03_12/input3.txt", (err, data) => {
  if (err) {
    console.log(err.message);
  } else {
    const rawClaims = data.toString("utf8").split("\n");
    let claims = []; //will contain arrays for each claim: [[x,y,width,height],[...],[...]...]
    let claimRows = []; //this will contain the actual row of the claim map
    let sizeX = 0; //fabric (or claim) x size
    let sizeY = 0; //fabric (or claim) Y size
    let tempNum = 0; //always changing temporary number

    // ************************************
    /*1. counting the size of the fabric*/
    // ************************************
    for (let i = 0; i < rawClaims.length; i++) {
      tempNum =
        Number(
          rawClaims[i].slice(
            rawClaims[i].indexOf("@") + 1,
            rawClaims[i].indexOf(",")
          )
        ) +
        Number(
          rawClaims[i].slice(
            rawClaims[i].indexOf(":") + 1,
            rawClaims[i].indexOf("x")
          )
        );
      if (tempNum > sizeX) sizeX = tempNum;
      tempNum =
        Number(
          rawClaims[i].slice(
            rawClaims[i].indexOf(",") + 1,
            rawClaims[i].indexOf(":")
          )
        ) + Number(rawClaims[i].slice(rawClaims[i].indexOf("x") + 1));
      if (tempNum > sizeY) sizeY = tempNum;
    } //for i
    //    console.log(sizeX);
    //    console.log(sizeY);

    // ************************************
    /*2. creating the fabric */
    // ************************************
    for (let i = 0; i < sizeX; i++) {
      claimRows.push(0);
    }
    //    fs2.writeFileSync("./03_12/result.txt", claimRows);

    for (let i = 0; i < sizeY; i++) {
      claims.push([...claimRows]); //spread syntax, in order to push a new array to claims, not just a reference to claimRows
    }

    // ************************************
    /*3. filling up fabric with the claims, counting overlaps */
    // ************************************
    let posX = 0; //actual claim's upperleft corner's X position
    let posY = 0; //actual claim's upperleft corner's Y position
    for (let i = 0; i < rawClaims.length; i++) {
      posX = Number(
        rawClaims[i].slice(
          rawClaims[i].indexOf("@") + 1,
          rawClaims[i].indexOf(",")
        )
      );
      posY = Number(
        rawClaims[i].slice(
          rawClaims[i].indexOf(",") + 1,
          rawClaims[i].indexOf(":")
        )
      );
      sizeX = Number(
        rawClaims[i].slice(
          rawClaims[i].indexOf(":") + 1,
          rawClaims[i].indexOf("x")
        )
      );
      sizeY = Number(rawClaims[i].slice(rawClaims[i].indexOf("x") + 1));
      //console.log(posX, " ", posY, " ", sizeX, " ", sizeY);
      for (let j = 0; j < sizeY; j++) {
        for (let k = 0; k < sizeX; k++) {
          claims[posY + j][posX + k] += 1;
          /*
          console.log([posY + j], " ", [posX + k]);
          console.log(claims[posY + j][posX + k]);
          fs2.writeFileSync("./03_12/result3.txt", claims);
*/
        }
      } //for j
    } //for i 3
    //    fs2.writeFileSync("./03_12/result.txt", claims);

    // ************************************
    /*4. counting overlapping parts */
    // ************************************
    let numOfOverlaps = 0;
    for (let i = 0; i < claims.length; i++) {
      for (let j = 0; j < claimRows.length; j++) {
        if (claims[i][j] > 1) numOfOverlaps++;
      }
    }
    console.log("Overlapping square inches: ", numOfOverlaps);

    // ************************************
    /*5. finding the non-overlapping claim */
    // ************************************
    let overlapped = false;
    for (let i = 0; i < rawClaims.length; i++) {
      posX = Number(
        rawClaims[i].slice(
          rawClaims[i].indexOf("@") + 1,
          rawClaims[i].indexOf(",")
        )
      );
      posY = Number(
        rawClaims[i].slice(
          rawClaims[i].indexOf(",") + 1,
          rawClaims[i].indexOf(":")
        )
      );
      sizeX = Number(
        rawClaims[i].slice(
          rawClaims[i].indexOf(":") + 1,
          rawClaims[i].indexOf("x")
        )
      );
      sizeY = Number(rawClaims[i].slice(rawClaims[i].indexOf("x") + 1));
      overlapped = false;
      for (let j = 0; j < sizeY; j++) {
        for (let k = 0; k < sizeX; k++) {
          if (claims[posY + j][posX + k] > 1) {
            overlapped = true;
            break;
          }
        } //for k
        if (overlapped) break;
      } //for j
      if (!overlapped) {
        console.log("Not overlapping claim no.: ", i + 1);
        break;
      }
    } //for i(5.)
  } //else
});
