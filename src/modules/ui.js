import * as Palette from './palette.js'
import {getHeightColors} from "./palette.js";

const newGridModal = document.getElementById('new-grid-modal')
const gridContainer = document.getElementById('grid-container')

const defaultCellSize = 25
const currentCellSize = defaultCellSize

export function showNewGridModal() {
    newGridModal.showModal()
}

export function closeNewGridModal() {
    newGridModal.close()
}

export function displayGrid(grid, cellSize = currentCellSize) {
    gridContainer.style.height = intToPixels(grid.length * cellSize)
    gridContainer.style.width = intToPixels(grid.width * cellSize)

    for (let x = 0; x < grid.length; ++x) {
        const row = grid.cells[x]
        for (let y = 0; y < grid.width; ++y) {
            displayCell(row[y])
        }
    }
}

function displayCell(cell) {
    const cellDiv = document.createElement('div')
    cellDiv.classList.add('cell')
    cellDiv.dataset.x = cell.x
    cellDiv.dataset.y = cell.y
    cellDiv.style.width = intToPixels(currentCellSize)
    cellDiv.style.height = intToPixels(currentCellSize)
    cellDiv.style.backgroundColor = Palette.getHeightColors()[cell.height]
    cellDiv.innerText = Palette.getTerrainStamps()[cell.terrainType]
    gridContainer.append(cellDiv)
}

function intToPixels(int) {
    return String(int) + 'px'
}

export function clearGrid() {
    gridContainer.replaceChildren()
}
