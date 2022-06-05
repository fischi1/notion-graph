type ParsingZipStart = {
    file: File
}

export type ParsingZipStartEvent = CustomEvent<ParsingZipStart>

const eventType = "parsingZipStart"

const dispatchParsingZipStart = (detail: ParsingZipStart) => {
    document.dispatchEvent(new CustomEvent(eventType, { detail: detail }))
}

const addParsingZipStartListener = (
    onParsingZipStart: (event: ParsingZipStartEvent) => void
) => {
    document.addEventListener(eventType, onParsingZipStart as any)
}

const removeParsingZipStartListener = (
    onParsingZipStart: (event: ParsingZipStartEvent) => void
) => {
    document.removeEventListener(eventType, onParsingZipStart as any)
}

export {
    dispatchParsingZipStart,
    addParsingZipStartListener,
    removeParsingZipStartListener
}
