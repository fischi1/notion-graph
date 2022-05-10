type BeginTraversal = {
    file: File
}

export type BeginTraversalEvent = CustomEvent<BeginTraversal>

const eventType = "beginTraversal"

const dispatchBeginTraversal = (detail: BeginTraversal) => {
    document.dispatchEvent(new CustomEvent(eventType, { detail: detail }))
}

const addBeginTraversalListener = (
    onBeginTraversal: (event: BeginTraversalEvent) => void
) => {
    document.addEventListener(eventType, onBeginTraversal as any)
}

export { dispatchBeginTraversal, addBeginTraversalListener }
