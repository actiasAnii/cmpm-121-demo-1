import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// set game name and header
const gameName = "Gone Fishin'";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.textAlign = "center"; // center align the header text
app.append(header); // add title text to the game

// group button and counter together with a div
const mainClicker = document.createElement("div");
mainClicker.style.display = "flex";
mainClicker.style.justifyContent = "center";
mainClicker.style.alignItems = "center";
mainClicker.style.flexDirection = "column"; // stack elements vertically
mainClicker.style.height = "calc(100vh - 60px)"; // height minus space for header

// create button
const button = document.createElement("button");
button.textContent = "🐟";

// set button style
button.style.fontSize = "150px"; // make emoji big
button.style.padding = "0"; // remove default padding
button.style.border = "none"; // remove default border
button.style.background = "none"; // remove default background
button.style.cursor = "pointer"; // make the cursor a pointer

// append the button to the app element
mainClicker.appendChild(button);

// create counter
let counter: number = 0;
const counterDisplay = document.createElement("div");
counterDisplay.style.fontSize = "24px"; // set font size
counterDisplay.style.marginTop = "20px"; // space from the element above it
counterDisplay.textContent = `${counter} fish caught`; // display value of counter

// add to the clicker div
mainClicker.appendChild(counterDisplay);

// append clicker div to the app
app.appendChild(mainClicker);

// register clicks and increase counter
button.addEventListener("click", () => {
  counter++;
  counterDisplay.textContent = `${counter} fish caught`;
});
