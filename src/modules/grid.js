import * as Cell from "./cell";
import * as Storage from "./storage";

const MINIMUM_GRID_SIZE = 20
const MAXIMUM_GRID_SIZE = 30
const DEFAULT_GRID_SIZE = 30

const defaultHeightColours = [
    '#6A3700',
    '#9A5D1A',
    '#BF7F3A',
    '#E4A766',
    '#FFD2A0',
]
//TODO: Use palette in localStorage, else use default
const heightColours = {
    '-1': defaultHeightColours[0],
    '0': defaultHeightColours[1],
    '1': defaultHeightColours[2],
    '2': defaultHeightColours[3],
    '3': defaultHeightColours[4],
}
const defaultColour = heightColours['0']

const defaultTerrainStamps = [
    '',
    'R',
    'D',
    'X',
    '!',
]
//TODO: Use palette in localStorage, else use default
const terrainStamps = {
    'Clear': defaultTerrainStamps[0],
    'Rough': defaultTerrainStamps[1],
    'Dense': defaultTerrainStamps[2],
    'Impassable': defaultTerrainStamps[3],
    'Blocked': defaultTerrainStamps[4],
}
const defaultStamp = terrainStamps['Clear']

const gridContainer = document.getElementById('grid-container')

const heightColoursContainer = document.getElementById('palette-container')
let activeHeight = defaultColour

const terrainStampsContainer = document.getElementById('terrain-stamp-container')
let activeTerrain = defaultStamp

export function create(
    length = DEFAULT_GRID_SIZE,
    width = DEFAULT_GRID_SIZE,
    cellSize = Cell.getCellSize()
) {
    const grid = []

    gridContainer.style.height = getPixelDimension(length * cellSize)
    gridContainer.style.width = getPixelDimension(width * cellSize)

    for (let x = 0; x < length; ++x) {
        const row = []

        for (let y = 0; y < width; ++y) {
            const cell = Cell.create(x, y)
            row.push(cell)

            const cellDiv = document.createElement('div')
            cellDiv.dataset.x = cell.x
            cellDiv.dataset.y = cell.y
            cellDiv.style.width = getPixelDimension(cellSize)
            cellDiv.style.height = getPixelDimension(cellSize)
            cellDiv.style.backgroundColor = defaultColour
            cellDiv.addEventListener('click', changeCellColor)
            cellDiv.addEventListener('click', changeCellTerrainType)

            gridContainer.append(cellDiv)
        }

        grid.push(row)
    }

    Storage.updateCurrentGrid(grid)
}

function getPixelDimension(int) {
    return String(int) + 'px'
}

export function clearGrid() {
    gridContainer.replaceChildren()
}

export function createPalette(palette = heightColours, paletteContainer = heightColoursContainer) {
    Object.values(palette).forEach((hexCode) => {
        const color = document.createElement('div')

        color.style.backgroundColor = hexCode

        paletteContainer.append(color)

        color.addEventListener('click', changeActiveColor)
    })
}

function changeActiveColor(event) {
    activeHeight = event.target.style.backgroundColor
}

function changeCellColor(event) {
    event.target.style.backgroundColor = activeHeight
}

export function createTerrainStamps(
    terrainTypes = terrainStamps,
    terrainStampContainer = terrainStampsContainer
) {
    Object.values(terrainTypes).forEach((terrainType) => {
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

export function getMinimumSize() {
    return MINIMUM_GRID_SIZE
}

export function getMaximumSize() {
    return MAXIMUM_GRID_SIZE
}
