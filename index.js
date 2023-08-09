/** @format */

const g = 10;
const height = 10;
const mPerPx = (height / window.innerHeight) * 1;
const gInPx = g / mPerPx;
console.log(mPerPx);
const round10 = (value, exp) => decimalAdjust("round", value, exp);
let canvas = document.getElementById("canvas");

var cursorX;
var cursorY;

let boxSize = window.innerHeight * 0.1;

canvas.addEventListener("mousemove", (e) => {
  cursorX = e.pageX;
  cursorY = e.pageY;
});

canvas.addEventListener("mousemove", () => {
  const newDiv = document.createElement("div");
  newDiv.style.left = `${cursorX}px`;
  newDiv.style.top = `${cursorY}px`;
  newDiv.id = "box";
  // console.log(boxSize);
  let CurrentBoxPosY = cursorY;
  let CurrentBoxPosX = cursorX;

  canvas.appendChild(newDiv);

  let time = 0.005; //waiting time

  let inVeloInPxY = 0;
  let inVeloInPxX = 200;
  let distanceInPxY = 0;
  let distanceInPxX = 0;
  let e = 0.6;

  distanceInPxX = inVeloInPxX * time;

  let prevVelY = 0;

  let startFall = setInterval(() => {
    //vertical linear equations
    distanceInPxY = inVeloInPxY * time + gInPx * 0.5 * time ** 2;
    inVeloInPxY = inVeloInPxY + gInPx * time;
    // console.log("vel change ", inVeloInPxY);

    if (CurrentBoxPosY + boxSize + distanceInPxY <= window.innerHeight) {
      //changing box position
      CurrentBoxPosY += distanceInPxY;
      // CurrentBoxPosX += distanceInPxX;
      newDiv.style.top = `${CurrentBoxPosY}px`;
      // newDiv.style.left = `${CurrentBoxPosX}px`;
    } else {
      newDiv.style.top = `${window.innerHeight - boxSize}px`;
      hitground = true;
      if (inVeloInPxY >= 0 && inVeloInPxY < 1) {
        inVeloInPxY = 0;
        console.log("invel at the end", inVeloInPxY);

        clearInterval(startFall);
      } else {
        // console.log(inVeloInPxY);
        console.log(inVeloInPxY);
        let n = round10(inVeloInPxY * e, -4);
        inVeloInPxY = -n;
        console.log(inVeloInPxY);
      }
    }
  }, 5);
});

//ROUNDING NUMBERS
function decimalAdjust(type, value, exp) {
  type = String(type);
  if (!["round", "floor", "ceil"].includes(type)) {
    throw new TypeError(
      "The type of decimal adjustment must be one of 'round', 'floor', or 'ceil'."
    );
  }
  exp = Number(exp);
  value = Number(value);
  if (exp % 1 !== 0 || Number.isNaN(value)) {
    return NaN;
  } else if (exp === 0) {
    return Math[type](value);
  }
  const [magnitude, exponent = 0] = value.toString().split("e");
  const adjustedValue = Math[type](`${magnitude}e${exponent - exp}`);
  // Shift back
  const [newMagnitude, newExponent = 0] = adjustedValue.toString().split("e");
  return Number(`${newMagnitude}e${+newExponent + exp}`);
}
