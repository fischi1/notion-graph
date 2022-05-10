type EndTraversal = {}

export type EndTraversalEvent = CustomEvent<void>

const eventType = "endTraversal"

const dispatchEndTraversal = () => {
    document.dispatchEvent(new CustomEvent(eventType))
}

const addEndTraversalListener = (
    onEndTraversal: (event: EndTraversalEvent) => void
) => {
    document.addEventListener(eventType, onEndTraversal as any)
}

export { dispatchEndTraversal, addEndTraversalListener }
