import './style.css'
import Icon from './icon.png'
import * as Validator from './modules/validator.js'
import * as Cell from './modules/cell.js'
import * as Storage from './modules/storage.js'

const MINIMUM_GRID_SIZE = 20
const MAXIMUM_GRID_SIZE = 30
const DEFAULT_GRID_SIZE = 30
const CELL_SIZE = 30

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

const gridContainer = document.getElementById('grid-container')
const openNewGrid = document.getElementById('open-new-grid')
const closeNewGrid = document.getElementById('close-new-grid')
const newGridModal = document.getElementById('new-grid-modal')
const createNewGrid = document.getElementById('create-new-grid')

const paletteContainer = document.getElementById('palette-container')
let palette = DEFAULT_PALETTE
let activeColor = DEFAULT_CELL_COLOR

const terrainStampContainer = document.getElementById('terrain-stamp-container')
let activeTerrain = DEFAULT_TERRAIN_TYPE

openNewGrid.addEventListener('click', () => {
    newGridModal.showModal()
})
closeNewGrid.addEventListener('click', () => {
    newGridModal.close()
})
createNewGrid.addEventListener('click', (e) => {
    e.preventDefault()
    const length = document.getElementById('length').value
    const width = document.getElementById('width').value

    const validatedLength =
        Validator.validateDimension(length, MINIMUM_GRID_SIZE, MAXIMUM_GRID_SIZE)
    const validatedWidth =
        Validator.validateDimension(width, MINIMUM_GRID_SIZE, MAXIMUM_GRID_SIZE)

    if (!validatedLength.isValid) {
        console.log(validatedLength.message)
        return false
    } else if (!validatedWidth.isValid) {
        console.log(validatedWidth.message)
        return false
    }
    clearGrid()
    createGrid(length, width, CELL_SIZE)
    newGridModal.close()
})

createGrid(DEFAULT_GRID_SIZE, DEFAULT_GRID_SIZE, CELL_SIZE)
createPalette(palette, paletteContainer)
createTerrainStamps(TERRAIN_TYPES, terrainStampContainer)

function createGrid(length, width, cellSize) {
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
            cellDiv.style.backgroundColor = DEFAULT_CELL_COLOR
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
