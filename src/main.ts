import "./style.css";

//////// element creation
const app: HTMLDivElement = document.querySelector("#app")!;

// helper function to create elements and set styles
function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: {
    styles?: Partial<CSSStyleDeclaration>;
    textContent?: string;
    title?: string;
  } = {},
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (options.styles) Object.assign(element.style, options.styles);
  if (options.textContent) element.textContent = options.textContent;
  if (options.title) element.title = options.title;
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

// set up Upgrade interface
interface Upgrade {
  name: string;
  cost: number;
  rate: number;
  count: 0;
  description: string;
}

// make an array of Upgrade instances
// woops i did this in step 6 because i thought thats what it meant by "generalize your upgrade purchasing"
const upgrades: Upgrade[] = [
  {
    name: "Better Bait",
    cost: 10,
    rate: 0.1,
    count: 0,
    description: "with better bait, the fish practically hook themselves",
  },
  {
    name: "Upgraded Fishing Rod",
    cost: 50,
    rate: 2.0,
    count: 0,
    description: "an angler's pride is their rod",
  },
  {
    name: "Fishing Net",
    cost: 100,
    rate: 10.0,
    count: 0,
    description: "who says you have to reel in fish to catch 'em?",
  },
  {
    name: "Fishing Boat",
    cost: 1000,
    rate: 25.0,
    count: 0,
    description: "bigger boat",
  },
  {
    name: "Assistant Angler",
    cost: 5000,
    rate: 150.0,
    count: 0,
    description: "more hands on deck!",
  },
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
    title: upgrade.description,
  });
  upgradeButton.disabled = true; // disable initially

  const upgradeDisplay = createElement("div", {
    textContent: `${upgrade.name}'s purchased: ${upgrade.count}`,
    styles: { fontSize: "16px", textAlign: "center", color: "black" },
  });

  // add event listener to the button for upgrading
  upgradeButton.addEventListener("click", () => {
    if (counter >= upgrade.cost) {
      catchFish(-upgrade.cost);
      growthRate += upgrade.rate;
      upgrade.count += 1;

      // increase cost by 1.15 after each purchase
      upgrade.cost *= 1.15;

      // update the button and display with the new cost and count
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

  // periodically check if the button should be enabled based on current counter
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
