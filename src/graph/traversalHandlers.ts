import { dispatchParsingZipDone } from "../events/ParsingZipDone"
import { addParsingZipStartListener } from "../events/ParsingZipStart"
import { Page } from "../types/Page"
import parseZipFile from "./parseZipFile"

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
}

export default initHandlers
