import * as Slot from "./slot"

export const media = [
    'color',
    'text',
    //TODO: Allow images
]
const defaultColors = [
    '#6A3700',
    '#9A5D1A',
    '#BF7F3A',
    '#E4A766',
    '#FFD2A0',
]
const defaultText = [
    '',
    'R',
    'D',
    'X',
    '!',
]

export function create(medium,
                       data,
                       visuals = getDefaultVisualsByMedium(medium),
                       id = 0,
                       name = '') {
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

    return {
        id, type, medium, name, slots, activeSlot
    }
}

function getDefaultVisualsByMedium(medium) {
    if (medium === 'color') {
        return defaultColors
    } else if (medium === 'text') {
        return defaultText
    }
}
