const newGridModal = document.getElementById('new-grid-modal')
const gridContainer = document.getElementById('grid-container')

export function showNewGridModal() {
    newGridModal.showModal()
}

export function closeNewGridModal() {
    newGridModal.close()
}

export function displayGrid(grid, heightPalette, terrainPalette) {
    const cellSize = grid.cells[0][0].size
    gridContainer.style.height = intToPixels(grid.length * cellSize)
    gridContainer.style.width = intToPixels(grid.width * cellSize)

    for (let x = 0; x < grid.length; ++x) {
        const row = grid.cells[x]
        for (let y = 0; y < grid.width; ++y) {
            displayCell(row[y], heightPalette, terrainPalette)
        }
    }
}

function displayCell(cell, heightPalette, terrainPalette) {
    const cellDiv = document.createElement('div')
    cellDiv.classList.add('cell')
    cellDiv.dataset.x = cell.x
    cellDiv.dataset.y = cell.y
    cellDiv.style.width = intToPixels(cell.size)
    cellDiv.style.height = intToPixels(cell.size)
    cellDiv.style.backgroundColor = heightPalette.slots.find((slot) => slot.option === cell.height).visual
    cellDiv.innerText = terrainPalette.slots.find((slot) => slot.option === cell.terrainType).visual
    gridContainer.append(cellDiv)
}

function intToPixels(int) {
    return String(int) + 'px'
}

export function clearGrid() {
    gridContainer.replaceChildren()
}

const paletteContainer = document.getElementById('palette-container')

export function displayPalette(palette, container = paletteContainer) {
    const paletteDiv = document.createElement('div')
    paletteDiv.classList.add('palette')
    for (const slot of palette.slots) {
        displaySlot(slot, palette, paletteDiv)
    }
    container.append(paletteDiv)
}

//TODO: Display activeSlot
function displaySlot(slot, palette, paletteDiv) {
    const slotDiv = document.createElement('div')
    slotDiv.classList.add('palette-slot')
    slotDiv.dataset.option = slot.option
    displayVisual(slot, slotDiv)
    paletteDiv.append(slotDiv)
    slotDiv.addEventListener('click', () => palette.activeSlot = slot)
}

function displayVisual(slot, slotDiv) {
    const medium = slot.medium
    const visual = slot.visual
    if (medium === 'color') {
        slotDiv.style.backgroundColor = visual
    } else if (medium === 'text') {
        slotDiv.innerText = visual
    }
    //TODO: Enable image visuals
}
