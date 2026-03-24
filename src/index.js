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

    const length = lengthInput.value
    const width = widthInput.value
    const lengthValidation =
        Validator.validateDimension(length, Grid.minimumSize, Grid.maximumSize)
    const widthValidation =
        Validator.validateDimension(width, Grid.minimumSize, Grid.maximumSize)
    if (!lengthValidation.isValid) {
        console.log(lengthValidation.message)
        return false
    } else if (!widthValidation.isValid) {
        console.log(widthValidation.message)
        return false
    }
    Storage.updateItem(grid)
    grid = Grid.create(length, width)
    Storage.updateItem(grid)
    UI.clearGrid()
    UI.displayGrid(grid)
    UI.closeNewGridModal()
})

const defaultGrid = Grid.create()
let grid = defaultGrid
Storage.updateItem(grid)
UI.displayGrid(grid)
Palette.displayHeightColors(Cell.getHeights())
Palette.displayTerrainStamps(Cell.getTerrain())
subscribeCells()

function subscribeCells() {
    const cellDivs = document.getElementsByClassName('cell')
    for (const div of cellDivs) {
        div.addEventListener('click', (event) => {
            const cell = grid.cells[event.target.dataset.x][event.target.dataset.y]
            cell.height = Palette.getCurrentHeightColor().currentHeight
            cell.terrainType = Palette.getCurrentTerrainStamp().currentTerrain
            Storage.updateItem(grid)
            UI.clearGrid()
            UI.displayGrid(grid)
            subscribeCells()
        })
    }
}
