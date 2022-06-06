type TraversalBegin = {
    pageCount: number
}

export type TraversalBeginEvent = CustomEvent<TraversalBegin>

const eventType = "traversalBegin"

const dispatchTraversalBegin = (detail: TraversalBegin) => {
    document.dispatchEvent(new CustomEvent(eventType, { detail: detail }))
}

const addTraversalBeginListener = (
    onTraversalBegin: (event: TraversalBeginEvent) => void
) => {
    document.addEventListener(eventType, onTraversalBegin as any)
}

const removeTraversalBeginListener = (
    onTraversalBegin: (event: TraversalBeginEvent) => void
) => {
    document.removeEventListener(eventType, onTraversalBegin as any)
}

export {
    dispatchTraversalBegin,
    addTraversalBeginListener,
    removeTraversalBeginListener
}
