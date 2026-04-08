import * as Palette from './palette.js'

const newGridModal = document.getElementById('new-grid-modal')
const gridContainer = document.getElementById('grid-container')

const defaultCellSize = 25
//TODO: Enable custom cell size
const currentCellSize = defaultCellSize

const paletteContainer = document.getElementById('palette-container')

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
    cellDiv.style.backgroundColor = Palette.heightColors[cell.height]
    cellDiv.innerText = Palette.terrainStamps[cell.terrainType]
    gridContainer.append(cellDiv)
}

function intToPixels(int) {
    return String(int) + 'px'
}

export function clearGrid() {
    gridContainer.replaceChildren()
}

export function displayPalette(palette, container = paletteContainer) {
    const paletteDiv = document.createElement('div')
    paletteDiv.classList.add('palette')
    for (const slot of palette.slots) {
        displaySlot(slot, paletteDiv)
    }
    container.append(paletteDiv)
}

function displaySlot(slot, paletteDiv) {
    const slotDiv = document.createElement('div')
    slotDiv.classList.add('palette-slot')
    slotDiv.dataset.option = slot.option
    displayVisual(slot, slotDiv)
    paletteDiv.append(slotDiv)
    // slotDiv.addEventListener('click', changeActiveSlot)
}

function displayVisual(slot, slotDiv) {
    const medium = slot.medium
    const visual = slot.visual
    if (medium === 'color') {
        slotDiv.style.backgroundColor = visual
    } else if (medium === 'text') {
        slotDiv.innerText = visual
    }
}

// function changeActiveSlot() {
//
// }
