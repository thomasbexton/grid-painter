const heightColorsContainer = document.getElementById('palette-container')
const defaultHeightColors = [
    '#6A3700',
    '#9A5D1A',
    '#BF7F3A',
    '#E4A766',
    '#FFD2A0',
]
//TODO: Use palette in localStorage, else use default
const heightColors = {
    '-1': defaultHeightColors[0],
    '0': defaultHeightColors[1],
    '1': defaultHeightColors[2],
    '2': defaultHeightColors[3],
    '3': defaultHeightColors[4],
}
const defaultHeight = '0'
const defaultColor = heightColors[defaultHeight]
let currentHeight = defaultHeight
let currentColor = defaultColor

const terrainStampsContainer = document.getElementById('terrain-stamp-container')
const defaultTerrainStamps = [
    '',
    'R',
    'D',
    'X',
    '!',
]
//TODO: Use stamps in localStorage, else use default
const terrainStamps = {
    'clear': defaultTerrainStamps[0],
    'rough': defaultTerrainStamps[1],
    'dense': defaultTerrainStamps[2],
    'impassable': defaultTerrainStamps[3],
    'blocked': defaultTerrainStamps[4],
}
const defaultTerrain = 'clear'
const defaultStamp = terrainStamps[defaultTerrain]
let currentTerrain = defaultTerrain
let currentStamp = defaultStamp

export function displayHeightColors(heights,
                                    palette = heightColors,
                                    container = heightColorsContainer) {
    heights.levels.forEach((level) => {
        const colorDiv = document.createElement('div')
        colorDiv.dataset.level = level
        colorDiv.style.backgroundColor = palette[level]
        container.append(colorDiv)
        colorDiv.addEventListener('click', changeCurrentHeightColor)
    })
}

function changeCurrentHeightColor(event) {
    currentHeight = event.target.dataset.level
    currentColor = event.target.style.backgroundColor
}

export function displayTerrainStamps(terrain,
                                     stamps = terrainStamps,
                                     container = terrainStampsContainer) {
    terrain.types.forEach((type) => {
        const stampDiv = document.createElement('div')
        stampDiv.dataset.type = type
        stampDiv.innerText = stamps[type]
        container.append(stampDiv)
        stampDiv.addEventListener('click', changeCurrentTerrainStamp)
    })
}

function changeCurrentTerrainStamp(event) {
    currentTerrain = event.target.dataset.type
    currentStamp = event.target.innerText
}

export function getHeightColors() {
    return heightColors
}

export function getTerrainStamps() {
    return terrainStamps
}

export function getCurrentHeightColor() {
    return { currentHeight, currentColor }
}

export function getCurrentTerrainStamp() {
    return { currentTerrain, currentStamp }
}
