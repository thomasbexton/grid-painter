import * as Slot from "./slot"

export const defaultColors = [
    '#6A3700',
    '#9A5D1A',
    '#BF7F3A',
    '#E4A766',
    '#FFD2A0',
]
//TODO: Remove hardcoded crosswalks
export const heightColors = {
    '-1': defaultColors[0],
    '0': defaultColors[1],
    '1': defaultColors[2],
    '2': defaultColors[3],
    '3': defaultColors[4],
}
const defaultHeight = '0'
const defaultColor = heightColors[defaultHeight]
export let currentHeight = defaultHeight
export let currentColor = defaultColor

export const defaultText = [
    '',
    'R',
    'D',
    'X',
    '!',
]
//TODO: Remove hardcoded crosswalks
export const terrainStamps = {
    'clear': defaultText[0],
    'rough': defaultText[1],
    'dense': defaultText[2],
    'impassable': defaultText[3],
    'blocked': defaultText[4],
}
const defaultTerrain = 'clear'
const defaultStamp = terrainStamps[defaultTerrain]
export let currentTerrain = defaultTerrain
export let currentStamp = defaultStamp

// export function displayHeightColors(data,
//                                     crosswalk = heightColors,
//                                     container = paletteContainer) {
//     const paletteDiv = document.createElement('div')
//     paletteDiv.classList.add('palette')
//     for (const option of data.options) {
//         const slotDiv = document.createElement('div')
//         slotDiv.classList.add('palette-slot')
//         slotDiv.dataset.option = option
//         slotDiv.style.backgroundColor = crosswalk[option]
//         paletteDiv.append(slotDiv)
//         slotDiv.addEventListener('click', changeCurrentHeightColor)
//     }
//     container.append(paletteDiv)
// }
//
// export function displayTerrainStamps(data,
//                                      crosswalk = terrainStamps,
//                                      container = paletteContainer) {
//     const paletteDiv = document.createElement('div')
//     paletteDiv.classList.add('palette')
//     for (const option of data.options) {
//         const slotDiv = document.createElement('div')
//         slotDiv.classList.add('palette-slot')
//         slotDiv.dataset.option = option
//         slotDiv.innerText = crosswalk[option]
//         paletteDiv.append(slotDiv)
//         slotDiv.addEventListener('click', changeCurrentTerrainStamp)
//     }
//     container.append(paletteDiv)
// }
//
// function changeCurrentHeightColor(event) {
//     currentHeight = event.target.dataset.option
//     currentColor = event.target.style.backgroundColor
// }
//
// function changeCurrentTerrainStamp(event) {
//     currentTerrain = event.target.dataset.option
//     currentStamp = event.target.innerText
// }

export const media = [
    'color',
    'text',
]

export function create(medium, data, visuals, id = 0, name = '') {
    const type = 'palette'
    if (name === '') name = type + id.toString()

    // Validate media.includes(medium)
    // Validate that data.options.length === visuals.length

    const slots = []
    let activeSlot
    for (let index = 0; index < data.options.length; ++index) {
        const option = data.options[index]
        const isInitial = option === data.initial
        const slot = Slot.create(medium, option, visuals[index], isInitial)
        slots.push(slot)
        if (isInitial) activeSlot = slot
    }

    //TODO: Implement
    // function changeActiveSlot() {
    //
    // }

    return {
        id, type, medium, name, slots, activeSlot, // changeActiveSlot
    }
}
