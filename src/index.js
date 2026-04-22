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
    Storage.updateItem(currentGrid)
    const nextID = ++Storage.getLastItem().id
    const length = parseInt(lengthInput.value)
    const width = parseInt(widthInput.value)
    currentGrid = Grid.create(nextID, length, width)
    Storage.updateItem(currentGrid)
    UI.clearGrid()
    UI.displayGrid(currentGrid, heightPalette, terrainPalette)
    subscribeCells()
    UI.closeNewGridModal()
})

const heightPalette = Palette.create('color', Cell.heights)
const terrainPalette = Palette.create('text', Cell.terrain)
UI.displayPalette(heightPalette)
UI.displayPalette(terrainPalette)

const storedGrids = Storage.getItemsByType('grid')
const lastGrid = Storage.getLastItem(storedGrids)
let currentGrid = lastGrid ?? Grid.create()
Storage.updateItem(currentGrid)
UI.displayGrid(currentGrid, heightPalette, terrainPalette)
subscribeCells()

function subscribeCells() {
    const cellDivs = document.getElementsByClassName('cell')
    for (const div of cellDivs) {
        div.addEventListener('click', (event) => {
            const cell = currentGrid.cells[event.target.dataset.x][event.target.dataset.y]
            cell.height = heightPalette.activeSlot.option
            cell.terrainType = terrainPalette.activeSlot.option
            Storage.updateItem(currentGrid)
            UI.clearGrid()
            UI.displayGrid(currentGrid, heightPalette, terrainPalette)
            subscribeCells()
        })
    }
}
