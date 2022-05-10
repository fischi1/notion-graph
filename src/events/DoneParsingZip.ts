import { Page } from "../types/Page"

type DoneParsingZip = {
    file: File
    root: Page
}

export type DoneParsingZipEvent = CustomEvent<DoneParsingZip>

const eventType = "doneParsingZip"

const dispatchDoneParsingZip = (detail: DoneParsingZip) => {
    document.dispatchEvent(new CustomEvent(eventType, { detail: detail }))
}

const addDoneParsingZipListener = (
    onDoneParsingZip: (event: DoneParsingZipEvent) => void
) => {
    document.addEventListener(eventType, onDoneParsingZip as any)
}

const removeAddDoneParsingZipListener = (
    onDoneParsingZip: (event: DoneParsingZipEvent) => void
) => {
    document.removeEventListener(eventType, onDoneParsingZip as any)
}

export {
    dispatchDoneParsingZip,
    addDoneParsingZipListener,
    removeAddDoneParsingZipListener
}
