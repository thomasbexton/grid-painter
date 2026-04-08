export const heights = {
    'options': [
        '-1',
        '0',
        '1',
        '2',
        '3',
    ],
    'default': '0',
}
export const terrain = {
    'options': [
        'clear',
        'rough',
        'dense',
        'impassable',
        'blocked',
    ],
    'default': 'clear',
}

export function create(x, y, height = heights.default, terrainType = terrain.default) {
    return {
        x, y, height, terrainType
    }
}
