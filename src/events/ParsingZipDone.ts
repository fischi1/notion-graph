import { Page } from "../types/Page"

type ParsingZipDone = {
    file: File
    root: Page
}

export type ParsingZipDoneEvent = CustomEvent<ParsingZipDone>

const eventType = "parsingZipDone"

const dispatchParsingZipDone = (detail: ParsingZipDone) => {
    document.dispatchEvent(new CustomEvent(eventType, { detail: detail }))
}

const addParsingZipDoneListener = (
    onParsingZipDone: (event: ParsingZipDoneEvent) => void
) => {
    document.addEventListener(eventType, onParsingZipDone as any)
}

const removeParsingZipDoneListener = (
    onParsingZipDone: (event: ParsingZipDoneEvent) => void
) => {
    document.removeEventListener(eventType, onParsingZipDone as any)
}

export {
    dispatchParsingZipDone,
    addParsingZipDoneListener,
    removeParsingZipDoneListener
}
