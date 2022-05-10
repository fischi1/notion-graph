import { addBeginTraversalListener } from "../events/BeginTraversalEvent"
import { dispatchEndTraversal } from "../events/EndTraversalEvent"
import parseZipFile from "./parseZipFile"
import traversePages from "./traversePages"

const initHandlers = () => {
    addBeginTraversalListener(async (event) => {
        const root = await parseZipFile(event.detail.file)
        console.log(root)
        await traversePages(root, "breadth-first")
        dispatchEndTraversal()
    })
}

export default initHandlers
