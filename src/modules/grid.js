import * as Cell from "./cell";

export const minimumSize = 20
export const maximumSize = 30
export const defaultSize = 25

let idCounter = 0

export function create(length = defaultSize, width = defaultSize) {
    //TODO: Get key of latest item in storage or default to 0
    const id = idCounter++
    //TODO: Use inputted name or default to gridID
    const name = `grid${id}`
    const cells = []
    for (let x = 0; x < length; ++x) {
        const row = []
        for (let y = 0; y < width; ++y) {
            const cell = Cell.create(x, y)
            row.push(cell)
        }
        cells.push(row)
    }
    return { id, name, cells, length, width }
}
