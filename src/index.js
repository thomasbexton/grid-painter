import './style.css'
import Icon from './icon.png'
import * as Validator from './modules/validator.js'
import * as Grid from "./modules/grid";

const openNewGrid = document.getElementById('open-new-grid')
const closeNewGrid = document.getElementById('close-new-grid')

openNewGrid.addEventListener('click', () => {
    newGridModal.showModal()
})
closeNewGrid.addEventListener('click', () => {
    newGridModal.close()
})

const newGridModal = document.getElementById('new-grid-modal')
const createNewGrid = document.getElementById('create-new-grid')

createNewGrid.addEventListener('click', (e) => {
    e.preventDefault()
    const length = document.getElementById('length').value
    const width = document.getElementById('width').value

    const validatedLength =
        Validator.validateDimension(length, Grid.getMinimumSize(), Grid.getMaximumSize())
    const validatedWidth =
        Validator.validateDimension(width, Grid.getMinimumSize(), Grid.getMaximumSize())

    if (!validatedLength.isValid) {
        console.log(validatedLength.message)
        return false
    } else if (!validatedWidth.isValid) {
        console.log(validatedWidth.message)
        return false
    }
    Grid.clearGrid()
    Grid.create(length, width)
    newGridModal.close()
})

Grid.create()
Grid.createPalette()
Grid.createTerrainStamps()
