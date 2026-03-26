export function updateItem(item) {
    localStorage.setItem(item.id, JSON.stringify(item))
}

export function getItemsByType(type) {
    const items = getItems()
    return items.filter((item) => item.type === type)
}

export function getLastItem() {
    const items = getItems()
    return items.findLast((item) => item)
}

function getItems() {
    const sortedKeys = Object.keys(localStorage).sort()
    let items = []
    sortedKeys.forEach((key) => {
        const parsedValue = JSON.parse(localStorage.getItem(key))
        items.push(parsedValue)
        return items
    })
    return items
}
