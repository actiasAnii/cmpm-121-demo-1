import "./style.css";

let clickCounter = 0;
let clickGrowthRate = 0;
let lastIncrementTime = 0;

const upgradeScale = 1.15;

interface Upgrade {
  name: string;
  cost: number;
  rate: number;
  count: 0;
  description: string;
}

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

//// element creation

const app: HTMLDivElement = document.querySelector("#app")!;

function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: {
    styles?: Partial<CSSStyleDeclaration>;
    textContent?: string;
    title?: string;
  } = {}
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  if (options.styles) Object.assign(element.style, options.styles);
  if (options.textContent) element.textContent = options.textContent;
  if (options.title) element.title = options.title;
  return element;
}

const gameName = "Gone Fishin'";
document.title = gameName;

const header = createElement("h1", {
  textContent: gameName,
  styles: { textAlign: "center" },
});
app.appendChild(header);

const mainClickContainer = createElement("div", {
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
app.appendChild(mainClickContainer);

const clickButton = createElement("button", {
  textContent: "🐟",
  styles: {
    fontSize: "150px",
    padding: "0",
    border: "none",
    background: "none",
  },
});
mainClickContainer.appendChild(clickButton);

const counterDisplay = createElement("div", {
  textContent: `${clickCounter} fish caught`,
  styles: {
    fontSize: "24px",
    marginTop: "20px",
  },
});
mainClickContainer.appendChild(counterDisplay);

const growthRateDisplay = createElement("div", {
  textContent: `Current Catch Rate: ${clickGrowthRate.toFixed(1)} fish/sec`,
  styles: {
    fontSize: "20px",
    marginTop: "10px",
  },
});
mainClickContainer.appendChild(growthRateDisplay);

const upgradeContainer = createElement("div", {
  styles: {
    position: "absolute",
    left: "10px",
    top: "50px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
    backgroundColor: "#f0f0f0",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
});
app.appendChild(upgradeContainer);

function createUpgradeRow(upgrade: Upgrade) {
  const upgradeButton = createElement("button", {
    textContent: `Buy ${upgrade.name} (+${upgrade.rate} fish/sec, costs ${upgrade.cost})`,
    title: upgrade.description,
  });
  upgradeButton.disabled = true;

  const upgradeDisplay = createElement("div", {
    textContent: `${upgrade.name}'s purchased: ${upgrade.count}`,
    styles: { fontSize: "16px", textAlign: "center", color: "black" },
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

  return { upgradeButton, upgradeDisplay, upgradeRow };
}

function handleUpgrade(
  upgrade: Upgrade,
  upgradeButton: HTMLButtonElement,
  upgradeDisplay: HTMLDivElement,
  growthRateDisplay: HTMLDivElement
) {
  upgradeButton.addEventListener("click", () => {
    if (clickCounter >= upgrade.cost) {
      catchFish(-upgrade.cost);
      clickGrowthRate += upgrade.rate;
      upgrade.count += 1;
      upgrade.cost *= upgradeScale;

      upgradeButton.textContent = `Buy ${upgrade.name} (+${upgrade.rate} fish/sec, costs ${upgrade.cost.toFixed(2)})`;
      upgradeDisplay.textContent = `${upgrade.name} purchased: ${upgrade.count}`;
      growthRateDisplay.textContent = `Current Growth Rate: ${clickGrowthRate.toFixed(1)} fish/sec`;
    }
  });
}

function updateButtonState(upgradeButton: HTMLButtonElement, upgrade: Upgrade) {
  setInterval(() => {
    upgradeButton.disabled = clickCounter < upgrade.cost;
  }, 100);
}

function initializeUpgrades(
  upgrades: Upgrade[],
  upgradeContainer: HTMLDivElement,
  growthRateDisplay: HTMLDivElement
) {
  upgrades.forEach((upgrade) => {
    const { upgradeButton, upgradeDisplay, upgradeRow } =
      createUpgradeRow(upgrade);

    handleUpgrade(upgrade, upgradeButton, upgradeDisplay, growthRateDisplay);
    updateButtonState(upgradeButton, upgrade);

    upgradeContainer.appendChild(upgradeRow);
  });
}

initializeUpgrades(upgrades, upgradeContainer, growthRateDisplay);

//// functionality

function catchFish(amount: number) {
  clickCounter += amount;
  counterDisplay.textContent = `${clickCounter.toFixed(2)} Fish Caught`;
}

clickButton.addEventListener("click", () => {
  catchFish(1);
});

function continuousCounterUpdate(timestamp: number) {
  if (!lastIncrementTime) lastIncrementTime = timestamp;
  const deltaTime = timestamp - lastIncrementTime;
  lastIncrementTime = timestamp;

  const increaseAmt = (deltaTime / 1000) * clickGrowthRate;
  catchFish(increaseAmt);

  requestAnimationFrame(continuousCounterUpdate);
}

requestAnimationFrame(continuousCounterUpdate);
