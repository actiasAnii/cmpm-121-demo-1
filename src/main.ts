import "./style.css";

//////// element creation
const app: HTMLDivElement = document.querySelector("#app")!;

// helper function to create elements and set styles
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: { styles?: Partial<CSSStyleDeclaration>; textContent?: string } = {},
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (options.styles) Object.assign(element.style, options.styles);
  if (options.textContent) element.textContent = options.textContent;
  return element;
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
    marginTop: "-200px",
    position: "relative",
  },
});
app.appendChild(mainClicker);

// create button element
const clickButton = createElement("button", {
  textContent: "🐟",
  styles: {
    fontSize: "150px",
    padding: "0",
    border: "none",
    background: "none",
    cursor: "pointer",
  },
});
mainClicker.appendChild(clickButton);

// create counter and growth rate
let counter = 0;
let growthRate = 0;

// create counter display
const counterDisplay = createElement("div", {
  textContent: `${counter} fish caught`,
  styles: {
    fontSize: "24px",
    marginTop: "20px",
  },
});
mainClicker.appendChild(counterDisplay);

// create current growth rate display
const growthRateDisplay = createElement("div", {
  textContent: `Current Catch Rate: ${growthRate.toFixed(1)} fish/sec`,
  styles: {
    fontSize: "20px",
    marginTop: "10px",
  },
});
mainClicker.appendChild(growthRateDisplay);

// create upgrade container
const upgradeContainer = createElement("div", {
  styles: {
    position: "absolute",
    left: "10px",
    top: "50px",
    display: "flex",
    flexDirection: "column",
    gap: "10px", // adds space between rows
    padding: "10px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
});
app.appendChild(upgradeContainer);

// create upgrade data for items A, B, and C
const upgrades = [
  { name: "Upgraded Fishing Rod", cost: 10, rate: 0.1, count: 0 },
  { name: "Fishing Net", cost: 100, rate: 2.0, count: 0 },
  { name: "Assistant Angler", cost: 1000, rate: 50.0, count: 0 },
];

// function to create upgrade buttons and display purchased count
upgrades.forEach((upgrade) => {
  const upgradeButton = createElement("button", {
    textContent: `Buy ${upgrade.name} (+${upgrade.rate} fish/sec, costs ${upgrade.cost})`,
    styles: {
      padding: "10px",
      fontSize: "16px",
      cursor: "pointer",
      width: "100%",
    },
  });
  upgradeButton.disabled = true; // disable initially

  const upgradeDisplay = createElement("div", {
    textContent: `${upgrade.name}'s purchased: ${upgrade.count}`,
    styles: { fontSize: "16px", textAlign: "center", color: "black" },
  });

  // add event listener to the button for upgrading
  upgradeButton.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      catchFish(-upgrade.cost); // deduct cost
      growthRate += upgrade.rate; // increase growth rate
      upgrade.count += 1; // increment count of upgrades -> nvm. will be using to cap upgrades ?

      // increase the cost by 1.15 after each purchase
      upgrade.cost *= 1.15;

      // Update the button and display with the new cost and count
      upgradeButton.textContent = `Buy ${upgrade.name} (+${upgrade.rate} fish/sec, costs ${upgrade.cost.toFixed(2)})`;
      upgradeDisplay.textContent = `${upgrade.name} purchased: ${upgrade.count}`;
      growthRateDisplay.textContent = `Current Growth Rate: ${growthRate.toFixed(1)} fish/sec`;
    }
  });

  const upgradeRow = createElement("div", {
    styles: {
      display: "flex",
      flexDirection: "column",
      width: "200px",
    },
  });

  upgradeRow.appendChild(upgradeButton);
  upgradeRow.appendChild(upgradeDisplay);

  upgradeContainer.appendChild(upgradeRow);

  // periodically check if the button should be enabled based on the current counter
  setInterval(() => {
    upgradeButton.disabled = counter < upgrade.cost;
  }, 100);
});

//////// functionality
// function to increase the counter and update the display
function catchFish(amount: number) {
  counter += amount;
  counterDisplay.textContent = `${counter.toFixed(2)} Fish Caught`;
}

// add event listener to button to increase counter
clickButton.addEventListener("click", () => {
  catchFish(1);
});

// use requestAnimationFrame to increment counter
let lastTime = 0;

// function to handle continuous growth
function updateCounter(timestamp: number) {
  if (!lastTime) lastTime = timestamp;
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  const increaseAmt = (deltaTime / 1000) * growthRate;
  catchFish(increaseAmt);

  requestAnimationFrame(updateCounter);
}

requestAnimationFrame(updateCounter);
