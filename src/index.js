import './style.css'
import Icon from './icon.png'
import * as Cell from './modules/cell.js'
import * as Grid from './modules/grid.js';
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
UI.displayGrid(defaultGrid)
UI.displayHeightPalette(Cell.getHeights())
UI.displayTerrainStamps(Cell.getTerrain())

//TODO: Enable using palette and stamps
// function subscribeCells() {
//     const cellDivs = document.getElementsByClassName('cell')
//     for (const div of cellDivs) {
//         div.addEventListener('click', (event) => {
//             const cell = grid.cells[event.target.dataset.x][event.target.dataset.y]
//             cell.height = Palette.getCurrentSelection().height
//             cell.terrainType = Stamper.getCurrentSelection().type
//             UI.clearGrid()
//             UI.displayGrid(grid)
//         })
//     }
// }
