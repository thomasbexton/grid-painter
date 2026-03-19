const heights = {
    'levels': [
        '-1',
        '0',
        '1',
        '2',
        '3',
    ],
    'default': '0',
}
const terrain = {
    'types': [
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

export function getHeights() {
    return heights
}

export function getTerrain() {
    return terrain
}
