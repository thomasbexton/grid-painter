const CELL_SIZE = 30

export function create(x, y, height = 0, terrainType = 'clear') {
    return {
        x, y, height, terrainType
    }
}

export function getCellSize() {
    return CELL_SIZE
}
