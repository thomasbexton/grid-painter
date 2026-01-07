import './style.css'
import Icon from './icon.png'

const MINIMUM_GRID_SIZE = 20
const MAXIMUM_GRID_SIZE = 30
const DEFAULT_GRID_SIZE = 30
const GRID_CONTAINER_SIZE = 900
const DEFAULT_CELL_COLOR = '#000000'

// const createGridButton = document.querySelector('#create-grid')
const gridContainer = document.getElementById('grid-container')

let activeColor = DEFAULT_CELL_COLOR

// createGridButton.addEventListener('click', getGridSize)
gridContainer.addEventListener('click', changeCellColor)

createGrid(DEFAULT_GRID_SIZE)

function createGrid(gridSize) {
    const cellSizeNumber = GRID_CONTAINER_SIZE / gridSize
    const cellSizeString = String(cellSizeNumber)
    const formattedCellSize = cellSizeString + 'px'

    for (let i = 0; i < gridSize; ++i) {
        for (let j = 0; j < gridSize; ++j) {
            const cell = document.createElement('div')

            cell.style.width = formattedCellSize
            cell.style.height = formattedCellSize
            cell.style.backgroundColor = DEFAULT_CELL_COLOR

            cell.addEventListener('click', changeCellColor)

            gridContainer.append(cell)
        }
    }
}

function clearGrid() {
    gridContainer.replaceChildren()
}

function changeCellColor(event) {
    event.target.style.backgroundColor = activeColor
}

// function getGridSize() {
//     if (!confirm
//     ('WARNING: This will delete your current drawing. Proceed?')) {
//         return
//     }
//     let gridSize = prompt('Choose your grid size (must be between 20 and 30).');
//     if (gridSize < MINIMUM_GRID_SIZE) {
//         gridSize = MINIMUM_GRID_SIZE
//     } else if (gridSize > MAXIMUM_GRID_SIZE) {
//         gridSize = MAXIMUM_GRID_SIZE
//     }
//
//     clearGrid()
//     createGrid(gridSize)
// }
