import { dispatchParsingZipDone } from "../events/ParsingZipDoneEvent"
import { addParsingZipStartListener } from "../events/ParsingZipStartEvent"
import { addTraversePagesListener } from "../events/TraversePagesEvent"
import collapsePageTooManyChildren from "../functions/collapsePageTooManyChildren"
import { Page } from "../types/Page"
import parseZipFile from "./parseZipFile"
import traversePages from "./traversePages"

const initHandlers = () => {
    addParsingZipStartListener(async (event) => {
        const file = event.detail.file
        let root: Page
        if (file.type === "application/json") {
            root = JSON.parse(await file.text()) as Page
        } else {
            root = await parseZipFile(file)
        }
        dispatchParsingZipDone({ file, root })
    })

    addTraversePagesListener(async (event) => {
        const { pages, traversalType, collapseThreshold, nodeAddDelay } =
            event.detail

        const clonedPages = structuredClone(pages)
        collapsePageTooManyChildren(clonedPages, collapseThreshold)
        traversePages(clonedPages, traversalType, nodeAddDelay)
    })
}

export default initHandlers
