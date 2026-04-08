const paletteContainer = document.getElementById('palette-container')

const defaultHeightColors = [
    '#6A3700',
    '#9A5D1A',
    '#BF7F3A',
    '#E4A766',
    '#FFD2A0',
]
//TODO: Use palette in localStorage, else use default
export const heightColors = {
    '-1': defaultHeightColors[0],
    '0': defaultHeightColors[1],
    '1': defaultHeightColors[2],
    '2': defaultHeightColors[3],
    '3': defaultHeightColors[4],
}
const defaultHeight = '0'
const defaultColor = heightColors[defaultHeight]
export let currentHeight = defaultHeight
export let currentColor = defaultColor

const defaultTerrainStamps = [
    '',
    'R',
    'D',
    'X',
    '!',
]
//TODO: Use stamps in localStorage, else use default
export const terrainStamps = {
    'clear': defaultTerrainStamps[0],
    'rough': defaultTerrainStamps[1],
    'dense': defaultTerrainStamps[2],
    'impassable': defaultTerrainStamps[3],
    'blocked': defaultTerrainStamps[4],
}
const defaultTerrain = 'clear'
const defaultStamp = terrainStamps[defaultTerrain]
export let currentTerrain = defaultTerrain
export let currentStamp = defaultStamp

export function displayHeightColors(data,
                                    crosswalk = heightColors,
                                    container = paletteContainer) {
    const paletteDiv = document.createElement('div')
    paletteDiv.classList.add('palette')
    for (const option of data.options) {
        const slotDiv = document.createElement('div')
        slotDiv.classList.add('palette-slot')
        slotDiv.dataset.option = option
        slotDiv.style.backgroundColor = crosswalk[option]
        paletteDiv.append(slotDiv)
        slotDiv.addEventListener('click', changeCurrentHeightColor)
    }
    container.append(paletteDiv)
}

export function displayTerrainStamps(data,
                                     crosswalk = terrainStamps,
                                     container = paletteContainer) {
    const paletteDiv = document.createElement('div')
    paletteDiv.classList.add('palette')
    for (const option of data.options) {
        const slotDiv = document.createElement('div')
        slotDiv.classList.add('palette-slot')
        slotDiv.dataset.option = option
        slotDiv.innerText = crosswalk[option]
        paletteDiv.append(slotDiv)
        slotDiv.addEventListener('click', changeCurrentTerrainStamp)
    }
    container.append(paletteDiv)
}

function changeCurrentHeightColor(event) {
    currentHeight = event.target.dataset.option
    currentColor = event.target.style.backgroundColor
}

function changeCurrentTerrainStamp(event) {
    currentTerrain = event.target.dataset.option
    currentStamp = event.target.innerText
}
