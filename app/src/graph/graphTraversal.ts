import { addBeginTraversalListener } from "../events/BeginTraversalEvent"
import urlToId from "../functions/urlToId"

const initGraphTraversal = () => {
    addBeginTraversalListener((event) => {
        console.log(urlToId(event.detail.notionUrl))
    })
}

export default initGraphTraversal
