import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// helper function to create elements and set styles
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K, // type of html element
  options: { styles?: Partial<CSSStyleDeclaration>; textContent?: string } = {}, // object holding styles and textContent properties
): HTMLElementTagNameMap[K] {
  // return type is based on tag
  const element = document.createElement(tag); // create the element using the tag
  if (options.styles) Object.assign(element.style, options.styles); // if styles are in options, apply to the element
  if (options.textContent) element.textContent = options.textContent; // if textContent is in options, apply to the element
  return element; // return created element
}

// set game name and document title
const gameName = "Gone Fishin'";
document.title = gameName;

// create header element
const header = createElement("h1", {
  textContent: gameName,
  styles: { textAlign: "center" },
});
app.appendChild(header);

// create main clicker container
const mainClicker = createElement("div", {
  styles: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "calc(100vh - 60px)",
  },
});
// append clicker container to app
app.appendChild(mainClicker);

// create button element
const button = createElement("button", {
  textContent: "🐟",
  styles: {
    fontSize: "150px",
    padding: "0",
    border: "none",
    background: "none",
    cursor: "pointer",
  },
});
// append button to clicker container
mainClicker.appendChild(button);

// create counter display
let counter = 0;
const counterDisplay = createElement("div", {
  textContent: `${counter} fish caught`,
  styles: {
    fontSize: "24px",
    marginTop: "20px",
  },
});
// append counter display to clicker container
mainClicker.appendChild(counterDisplay);

// function to increase the counter and update the display
function catchFish(amount: number) {
  counter += amount; // increase the counter by the given amount
  counterDisplay.textContent = `${counter.toFixed(2)} fish caught`; // update the display
}

// add event listener to button to increase counter
button.addEventListener("click", () => {
  catchFish(1);
});

// use requestAnimationFrame to increment counter
let lastTime = 0;

function updateCounter(timestamp: number) {
  if (!lastTime) lastTime = timestamp; // set initial timestamp if first frame

  const deltaTime = timestamp - lastTime; // calculate time difference since the last frame
  lastTime = timestamp; // update last frame time

  const increaseAmt = deltaTime / 1000; // calculate how much to increase based on elapsed time
  catchFish(increaseAmt); // increase counter

  // request next animation frame
  requestAnimationFrame(updateCounter);
}

// start the animation loop
requestAnimationFrame(updateCounter);
