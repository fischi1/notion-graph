import { addBeginTraversalListener } from "../events/BeginTraversalEvent"
import { dispatchEndTraversal } from "../events/EndTraversalEvent"
import dispatchNewPageEvent from "../events/NewPageEvent"
import { getSocket } from "../functions/initSocketIo"
import urlToId from "../functions/urlToId"

const initGraphTraversal = () => {
    addBeginTraversalListener(async (event) => {
        const pageId = urlToId(event.detail.notionUrl)

        const socket = getSocket()
        socket?.emit("startParsing", { pageId })

        socket?.on("newPage", ({ newPage }) => {
            dispatchNewPageEvent(newPage)
        })

        socket?.on("doneParsing", () => {
            dispatchEndTraversal({})
        })
    })
}

export default initGraphTraversal
