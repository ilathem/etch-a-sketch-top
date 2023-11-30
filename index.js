const promptBtn = document.querySelector("#promptBtn");
promptBtn.addEventListener("click", () => {
    const userInput = prompt("How Many Squares Per Side?");
    if (
        typeof Number(userInput) !== "number" ||
        !Number.isInteger(Number(userInput)) ||
        Number(userInput) > 100
    ) alert("Error: must be a whole number less than 100");
    else redrawGrid(Number(userInput));
})

function redrawGrid(squaresPerSide) {
    const rootDiv = document.querySelector('#root');
    rootDiv.innerHTML = "";
    const rows = new Array(squaresPerSide);
    const grid = new Array(squaresPerSide);
    for (let i = 0; i < squaresPerSide; i++) {
        grid[i] = new Array(squaresPerSide);
        rows[i] = document.createElement('div');
        rows[i].classList.add('rowDiv');
        for (let j = 0; j < squaresPerSide; j++) {
            grid[i][j] = document.createElement('div')
            grid[i][j].classList.add('gridDiv');
            grid[i][j].addEventListener('mouseover', (event) => {
                grid[i][j].classList.add('gridDivHovered')
                if (event.buttons === 1) {
                    addRandomBackground(grid[i][j]);
                }
            })
            grid[i][j].addEventListener('mousedown', (event) => {
                if (event.button === 0) {
                    addRandomBackground(grid[i][j]);
                }
            })
            grid[i][j].addEventListener('contextmenu', (e) => {
                e.preventDefault();
            })
            grid[i][j].addEventListener('wheel', (e) => {
                if (e.wheelDelta > 0) {
                    changeLightness(grid[i][j], "up");
                } else {
                    changeLightness(grid[i][j], "down");
                }
            })
            rows[i].appendChild(grid[i][j]);
        }
        rootDiv.appendChild(rows[i]);
    }
}

function addRandomBackground(gridNode) {
    const randomHue = getRandomHue();
    gridNode.style.backgroundColor = `hsl(${randomHue}, 100%, 50%)`;
    gridNode.setAttribute("data-lightness", "50%");
    gridNode.setAttribute("data-hue", randomHue);
}

function changeLightness(gridNode, direction) {
    const prevLightness = gridNode.getAttribute("data-lightness") ?? "50%";
    let nextLightness
    if (direction === "up") {
        nextLightness = parseFloat(prevLightness) + 5;
    } else if (direction === "down") {
        nextLightness = parseFloat(prevLightness) - 5;
    }
    if (nextLightness > 50) nextLightness = 50;
    const strNextLightness = `${nextLightness}%`;
    gridNode.setAttribute("data-lightness", strNextLightness);
    const hue = gridNode.getAttribute('data-hue');
    gridNode.style.backgroundColor = `hsl(${hue}, 100%, ${strNextLightness})`;
}

// credit: https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
function getRandomHue() {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    return randomBetween(0, 360);
}

redrawGrid(16);
