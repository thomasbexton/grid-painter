export function updateItem(item) {
    localStorage.setItem(item.id, JSON.stringify(item))
}
