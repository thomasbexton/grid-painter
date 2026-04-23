import "./style.css"
import Icon from "./icon.png"
import * as Cell from "./modules/cell"
import * as Grid from "./modules/grid";
import * as Palette from "./modules/palette"
import * as Storage from "./modules/storage"
import * as UI from "./modules/ui"
import * as Validator from "./modules/validator"

const openNewGrid = document.getElementById('open-new-grid')
const closeNewGrid = document.getElementById('close-new-grid')
openNewGrid.addEventListener('click', () => {
    UI.showNewGridModal()
})
closeNewGrid.addEventListener('click', () => {
    UI.closeNewGridModal()
})

const createNewGrid = document.getElementById('create-new-grid')
const lengthInput = document.getElementById('length')
const widthInput = document.getElementById('width')
createNewGrid.addEventListener('click', (e) => {
    e.preventDefault()
    const lengthValidation =
        Validator.validateDimension(lengthInput.value, Grid.minimumSize, Grid.maximumSize)
    const widthValidation =
        Validator.validateDimension(widthInput.value, Grid.minimumSize, Grid.maximumSize)
    if (!lengthValidation.isValid) {
        console.log(lengthValidation.message)
        return false
    } else if (!widthValidation.isValid) {
        console.log(widthValidation.message)
        return false
    }
    Storage.updateItem(grid)
    const length = parseInt(lengthInput.value)
    const width = parseInt(widthInput.value)
    grid = Grid.create(Storage.getNextIDByType('grid'), length, width)
    Storage.updateItem(grid)
    UI.clearGrid()
    UI.displayGrid(grid, heightPalette, terrainPalette)
    subscribeCells()
    UI.closeNewGridModal()
})

const lastHeightPalette = Storage.getLastItemByType('heightPalette')
const lastTerrainPalette = Storage.getLastItemByType('terrainPalette')
let heightPalette = lastHeightPalette ?? Palette.create(Storage.getNextIDByType('palette'), 'color', Cell.heights)
let terrainPalette = lastTerrainPalette ?? Palette.create(Storage.getNextIDByType('palette'), 'text', Cell.terrains)
Storage.updateItem(heightPalette)
Storage.updateItem(terrainPalette)
UI.displayPalette(heightPalette)
UI.displayPalette(terrainPalette)

const lastGrid = Storage.getLastItemByType('grid')
let grid = lastGrid ?? Grid.create(Storage.getNextIDByType('grid'))
Storage.updateItem(grid)
UI.displayGrid(grid, heightPalette, terrainPalette)
subscribeCells()

function subscribeCells() {
    const cellDivs = document.getElementsByClassName('cell')
    for (const div of cellDivs) {
        div.addEventListener('click', (event) => {
            const cell = grid.cells[event.target.dataset.x][event.target.dataset.y]
            cell.height = heightPalette.activeSlot.option
            cell.terrain = terrainPalette.activeSlot.option
            Storage.updateItem(grid)
            UI.clearGrid()
            UI.displayGrid(grid, heightPalette, terrainPalette)
            subscribeCells()
        })
    }
}
