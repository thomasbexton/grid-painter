export function validateDimension(rawInput, minimum, maximum) {
    const parsed = parseInt(rawInput)
    const isValid = Number.isInteger(parsed)
        && parsed >= minimum
        && parsed <= maximum

    const errorMessage = `Invalid dimension. Enter a number from ${minimum} to ${maximum}`
    const message = isValid ? '' : errorMessage

    return {
        isValid: isValid,
        message: message,
    }
}
