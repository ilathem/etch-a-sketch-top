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
            grid[i][j].addEventListener('mouseover', () => {
                grid[i][j].classList.add('gridDivHovered')
            })
            grid[i][j].addEventListener('click', (event) => {
                if (event.button === 0) {
                    grid[i][j].style.backgroundColor = getRandomRGB();
                }
            })
            grid[i][j].addEventListener('contextmenu', (e) => {
                e.preventDefault();
                console.log('right mouse button clicked');
            })
            grid[i][j].addEventListener('wheel', (e) => {
                if (e.wheelDelta > 0) {
                    console.log('scrolled up');
                } else {
                    console.log('scrolled down');
                }
            })
            rows[i].appendChild(grid[i][j]);
        }
        rootDiv.appendChild(rows[i]);
    }
}

// credit: https://stackoverflow.com/questions/23095637/how-do-you-get-random-rgb-in-javascript
function getRandomRGB() {
    const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
    const r = randomBetween(0, 255);
    const g = randomBetween(0, 255);
    const b = randomBetween(0, 255);
    const rgb = `rgb(${r},${g},${b})`; // Collect all to a css color string
    return rgb;
}

redrawGrid(16);
