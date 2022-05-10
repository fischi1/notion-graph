import { addBeginTraversalListener } from "../events/BeginTraversalEvent"
import { dispatchEndTraversal } from "../events/EndTraversalEvent"
import { Page } from "../types/Page"
import parseZipFile from "./parseZipFile"
import traversePages from "./traversePages"

const initHandlers = () => {
    addBeginTraversalListener(async (event) => {
        const file = event.detail.file

        let root: Page
        if (file.type === "application/json") {
            root = JSON.parse(await file.text()) as Page
        } else {
            root = await parseZipFile(file)
        }

        console.log(root)
        await traversePages(root, "breadth-first")
        dispatchEndTraversal()
    })
}

export default initHandlers
