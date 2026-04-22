import * as Slot from "./slot"

export const defaultColors = [
    '#6A3700',
    '#9A5D1A',
    '#BF7F3A',
    '#E4A766',
    '#FFD2A0',
]
export const defaultText = [
    '',
    'R',
    'D',
    'X',
    '!',
]

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

    // function changeCurrentHeightColor(event) {
    //     currentHeight = event.target.dataset.option
    //     currentColor = event.target.style.backgroundColor
    // }
    //
    // function changeCurrentTerrainStamp(event) {
    //     currentTerrain = event.target.dataset.option
    //     currentStamp = event.target.innerText
    // }
    //TODO: Implement
    // function changeActiveSlot() {
    //
    // }

    return {
        id, type, medium, name, slots, activeSlot, //changeActiveSlot
    }
}
