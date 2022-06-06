import { Page } from "../types/Page"
import { TraversalType } from "../types/TraversalType"

type TraversePages = {
    pages: Page
    traversalType: TraversalType
    collapseThreshold: number
    nodeAddDelay: number
}

export type TraversePagesEvent = CustomEvent<TraversePages>

const eventType = "traversePages"

const dispatchTraversePages = (detail: TraversePages) => {
    document.dispatchEvent(new CustomEvent(eventType, { detail: detail }))
}

const addTraversePagesListener = (
    onTraversePages: (event: TraversePagesEvent) => void
) => {
    document.addEventListener(eventType, onTraversePages as any)
}

const removeTraversePagesListener = (
    onTraversePages: (event: TraversePagesEvent) => void
) => {
    document.removeEventListener(eventType, onTraversePages as any)
}

export {
    dispatchTraversePages,
    addTraversePagesListener,
    removeTraversePagesListener
}
