const rootDiv = document.querySelector('#root');
const rows = new Array(16);
const grid = new Array(16);
for (let i = 0; i < 16; i++) {
    grid[i] = new Array(16);
    rows[i] = document.createElement('div');
    rows[i].classList.add('rowDiv');
    for (let j = 0; j < 16; j++) {
        grid[i][j] = document.createElement('div')
        grid[i][j].classList.add('gridDiv');
        grid[i][j].addEventListener('mouseover', () => {
            grid[i][j].classList.add('gridDivHovered')
        })
        rows[i].appendChild(grid[i][j]);
    }
    rootDiv.appendChild(rows[i]);
}
