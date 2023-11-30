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
            rows[i].appendChild(grid[i][j]);
        }
        rootDiv.appendChild(rows[i]);
    }
}

redrawGrid(16);
