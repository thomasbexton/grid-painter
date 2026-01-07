import './style.css'
import Icon from './icon.png'

const MINIMUM_GRID_SIZE = 20
const MAXIMUM_GRID_SIZE = 30
const DEFAULT_GRID_SIZE = 30
const GRID_CONTAINER_SIZE = 900

const DEFAULT_PALETTE = [
    '#9A5D1A',
    '#BF7F3A',
    '#E4A766',
    '#FFD2A0',
    '#6A3700',
    '#554F49',
    '#221E1A',
]
const DEFAULT_CELL_COLOR = DEFAULT_PALETTE[0]

const TERRAIN_TYPES = [
    '',
    'R',
    'D',
]
const DEFAULT_TERRAIN_TYPE = TERRAIN_TYPES[0]

// const createGridButton = document.querySelector('#create-grid')
const gridContainer = document.getElementById('grid-container')

const paletteContainer = document.getElementById('palette-container')
let palette = DEFAULT_PALETTE
let activeColor = DEFAULT_CELL_COLOR

const terrainStampContainer = document.getElementById('terrain-stamp-container')
let activeTerrain = DEFAULT_TERRAIN_TYPE

// createGridButton.addEventListener('click', getGridSize)

createGrid(DEFAULT_GRID_SIZE)
createPalette(palette, paletteContainer)
createTerrainStamps(TERRAIN_TYPES, terrainStampContainer)

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
            cell.addEventListener('click', changeCellTerrainType)

            gridContainer.append(cell)
        }
    }
}

function clearGrid() {
    gridContainer.replaceChildren()
}

function createPalette(palette, paletteContainer) {
    palette.forEach((hexCode) => {
        const color = document.createElement('div')

        color.style.backgroundColor = hexCode

        paletteContainer.append(color)

        color.addEventListener('click', changeActiveColor)
    })
}

function changeActiveColor(event) {
    activeColor = event.target.style.backgroundColor
}

function changeCellColor(event) {
    event.target.style.backgroundColor = activeColor
}

function createTerrainStamps(terrainTypes, terrainStampContainer) {
    terrainTypes.forEach((terrainType) => {
        const stamp = document.createElement('div')

        stamp.innerText = terrainType

        terrainStampContainer.append(stamp)

        stamp.addEventListener('click', changeActiveTerrain)
    })
}

function changeActiveTerrain(event) {
    activeTerrain = event.target.innerText
}

function changeCellTerrainType(event) {
    event.target.innerText = activeTerrain
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
