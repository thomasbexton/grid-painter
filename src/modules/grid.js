import * as Cell from "./cell";

export const minimumSize = 20
export const maximumSize = 30
export const defaultSize = 25

export function create(id,
                       length = defaultSize,
                       width = defaultSize,
                       name = '') {
    const type = 'grid'
    if (name === '') name = type + id.toString()
    const cells = []
    for (let x = 0; x < length; ++x) {
        const row = []
        for (let y = 0; y < width; ++y) {
            const cell = Cell.create(x, y)
            row.push(cell)
        }
        cells.push(row)
    }
    return {
        id, type, name, cells, length, width
    }
}
