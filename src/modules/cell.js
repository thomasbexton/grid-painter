export const defaultCellSize = 25
//TODO: Enable custom cell size
// const currentCellSize = defaultCellSize
export const heights = {
    options: [
        '-1',
        '0',
        '1',
        '2',
        '3',
    ],
    initial: '0',
}
export const terrain = {
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
                       terrainType = terrain.initial) {
    return {
        x, y, size, height, terrainType
    }
}
