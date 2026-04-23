export const defaultCellSize = 25
//TODO: Enable custom cell size
// const currentCellSize = defaultCellSize
export const heights = {
    name: 'heights',
    options: [
        '-1',
        '0',
        '1',
        '2',
        '3',
    ],
    initial: '0',
}
export const terrains = {
    name: 'terrain',
    options: [
        'clear',
        'rough',
        'dense',
        'impassable',
        'blocked',
    ],
    initial: 'clear',
}

export function create(x,
                       y,
                       size = defaultCellSize,
                       height = heights.initial,
                       terrain = terrains.initial) {
    return {
        x, y, size, height, terrain
    }
}
