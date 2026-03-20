import './style.css'
import Icon from './icon.png'
import * as Cell from './modules/cell.js'
import * as Grid from './modules/grid.js';
import * as Palette from './modules/palette.js'
import * as UI from './modules/ui.js'
import * as Validator from './modules/validator.js'

const openNewGrid = document.getElementById('open-new-grid')
const closeNewGrid = document.getElementById('close-new-grid')
openNewGrid.addEventListener('click', () => {
    UI.showNewGridModal()
})
closeNewGrid.addEventListener('click', () => {
    UI.closeNewGridModal()
})

// const createNewGrid = document.getElementById('create-new-grid')
// const length = document.getElementById('length').value
// const width = document.getElementById('width').value
// createNewGrid.addEventListener('click', (e) => {
//     e.preventDefault()
//
//     const validatedLength =
//         Validator.validateDimension(length, Grid.getMinimumSize(), Grid.getMaximumSize())
//     const validatedWidth =
//         Validator.validateDimension(width, Grid.getMinimumSize(), Grid.getMaximumSize())
//     if (!validatedLength.isValid) {
//         console.log(validatedLength.message)
//         return false
//     } else if (!validatedWidth.isValid) {
//         console.log(validatedWidth.message)
//         return false
//     }
//     UI.clearGrid()
//     UI.displayGrid(Grid.create(length, width))
//     UI.closeNewGridModal()
// })

const defaultGrid = Grid.create()
let grid = defaultGrid
UI.displayGrid(grid)
Palette.displayHeightColors(Cell.getHeights())
Palette.displayTerrainStamps(Cell.getTerrain())
Palette.getCurrentHeightColor()
Palette.getCurrentTerrainStamp()
subscribeCells()

function subscribeCells() {
    const cellDivs = document.getElementsByClassName('cell')
    for (const div of cellDivs) {
        div.addEventListener('click', (event) => {
            const cell = grid.cells[event.target.dataset.x][event.target.dataset.y]
            cell.height = Palette.getCurrentHeightColor().currentHeight
            cell.terrainType = Palette.getCurrentTerrainStamp().currentTerrain
            UI.clearGrid()
            UI.displayGrid(grid)
            subscribeCells()
        })
    }
}
