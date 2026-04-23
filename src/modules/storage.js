export function updateItem(item) {
    localStorage.setItem(item.name, JSON.stringify(item))
}

export function getNextIDByType(type) {
    const items = getItemsByType(type)
    return ++items.length
}

export function getLastItemByType(type) {
    const items = getItemsByType(type)
    return items.findLast((item) => item)
}

export function getItemsByType(type) {
    const items = getItems()
    return items.filter((item) => item.type === type)
}

function getItems() {
    const sortedKeys = Object.keys(localStorage).sort()
    let items = []
    for (const key of sortedKeys) {
        const parsedValue = JSON.parse(localStorage.getItem(key))
        items.push(parsedValue)
    }
    return items
}
