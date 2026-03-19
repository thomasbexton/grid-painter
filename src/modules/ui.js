const newGridModal = document.getElementById('new-grid-modal')
const gridContainer = document.getElementById('grid-container')

// HEIGHT COLORS
const heightColorsContainer = document.getElementById('palette-container')
const defaultHeightColors = [
    '#6A3700',
    '#9A5D1A',
    '#BF7F3A',
    '#E4A766',
    '#FFD2A0',
]
//TODO: Use palette in localStorage, else use default
const heightColors = {
    '-1': defaultHeightColors[0],
    '0': defaultHeightColors[1],
    '1': defaultHeightColors[2],
    '2': defaultHeightColors[3],
    '3': defaultHeightColors[4],
}
const defaultColor = heightColors['0']
let currentColor = defaultColor

// TERRAIN STAMPS
const terrainStampsContainer = document.getElementById('terrain-stamp-container')
const defaultTerrainStamps = [
    '',
    'R',
    'D',
    'X',
    '!',
]
//TODO: Use stamps in localStorage, else use default
const terrainStamps = {
    'clear': defaultTerrainStamps[0],
    'rough': defaultTerrainStamps[1],
    'dense': defaultTerrainStamps[2],
    'impassable': defaultTerrainStamps[3],
    'blocked': defaultTerrainStamps[4],
}
const defaultStamp = terrainStamps['clear']
let currentStamp = defaultStamp

// CELL SIZING
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
    cellDiv.style.backgroundColor = heightColors[cell.height]
    cellDiv.innerText = terrainStamps[cell.terrainType]
    gridContainer.append(cellDiv)
}

function intToPixels(int) {
    return String(int) + 'px'
}

export function clearGrid() {
    gridContainer.replaceChildren()
}

export function displayHeightPalette(heights,
                                     palette = heightColors,
                                     container = heightColorsContainer) {
    heights.levels.forEach((level) => {
        const colorDiv = document.createElement('div')
        colorDiv.dataset.level = level
        colorDiv.style.backgroundColor = palette[level]
        container.append(colorDiv)
        colorDiv.addEventListener('click', changeCurrentColor)
    })
}

function changeCurrentColor(event) {
    currentColor = event.target.style.backgroundColor
    console.log(currentColor)
}

export function displayTerrainStamps(terrain,
                                     stamps = terrainStamps,
                                     container = terrainStampsContainer) {
    terrain.types.forEach((type) => {
        const stampDiv = document.createElement('div')
        stampDiv.dataset.type = type
        stampDiv.innerText = stamps[type]
        container.append(stampDiv)
        stampDiv.addEventListener('click', changeCurrentStamp)
    })
}

function changeCurrentStamp(event) {
    currentStamp = event.target.innerText
    console.log(currentStamp)
}
