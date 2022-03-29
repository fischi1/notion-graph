type EndTraversal = {}

export type EndTraversalEvent = CustomEvent<EndTraversal>

const eventType = "endTraversal"

const dispatchEndTraversal = (detail: EndTraversal) => {
    document.dispatchEvent(new CustomEvent(eventType, { detail: detail }))
}

const addEndTraversalListener = (
    onEndTraversal: (event: EndTraversalEvent) => void
) => {
    document.addEventListener(eventType, onEndTraversal as any)
}

export { dispatchEndTraversal, addEndTraversalListener }
