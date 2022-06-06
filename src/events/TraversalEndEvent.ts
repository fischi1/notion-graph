export type TraversalEndEvent = CustomEvent<void>

const eventType = "traversalEnd"

const dispatchTraversalEnd = () => {
    document.dispatchEvent(new CustomEvent(eventType))
}

const addTraversalEndListener = (
    onTraversalEnd: (event: TraversalEndEvent) => void
) => {
    document.addEventListener(eventType, onTraversalEnd as any)
}

const removeTraversalEndListener = (
    onTraversalEnd: (event: TraversalEndEvent) => void
) => {
    document.removeEventListener(eventType, onTraversalEnd as any)
}

export {
    dispatchTraversalEnd,
    addTraversalEndListener,
    removeTraversalEndListener
}
