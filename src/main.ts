import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

// set game name and header
const gameName = "Gone Fishin'";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.textAlign = "center"; // center align the header text
app.append(header);                // add title text to the game

// create tbutton element
const button = document.createElement('button');
button.textContent = '🐟';

// set button style
button.style.fontSize = '150px';        // make emoji big
button.style.padding = '0';             // remove default padding
button.style.border = 'none';           // remove default border
button.style.background = 'none';       // remove default background
button.style.cursor = 'pointer';        // make the cursor a pointer
button.style.position = 'absolute';     // set position
button.style.top = '30%';               // position relative to app
button.style.left = '50%';
button.style.transform = 'translate(-50%, -50%)'; //shift button to align better

// make sure app container is positioned relative to allow absolute positioning of the button
app.style.position = 'relative';
app.style.height = '100vh';              // make sure app fills viewport

// append the button to the app element
app.appendChild(button);

// register clicks
button.addEventListener('click', () => {
    console.log("You've caught a fish!");
});