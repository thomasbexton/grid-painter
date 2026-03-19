import * as Cell from "./cell";
import * as Storage from "./storage";

const minimumGridSize = 20
const maximumGridSize = 30
const defaultGridSize = 25

export function create(length = defaultGridSize, width = defaultGridSize) {
    const cells = []
    for (let x = 0; x < length; ++x) {
        const row = []

        for (let y = 0; y < width; ++y) {
            const cell = Cell.create(x, y)
            row.push(cell)
        }

        cells.push(row)
    }

    Storage.updateCurrentGrid(cells)

    return { cells, length, width }
}

export function getMinimumSize() {
    return minimumGridSize
}

export function getMaximumSize() {
    return maximumGridSize
}
