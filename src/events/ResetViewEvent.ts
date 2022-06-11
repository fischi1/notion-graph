export type ResetViewEvent = CustomEvent<void>

const eventType = "resetView"

const dispatchResetView = () => {
    document.dispatchEvent(new CustomEvent(eventType))
}

const addResetViewListener = (onResetView: (event: ResetViewEvent) => void) => {
    document.addEventListener(eventType, onResetView as any)
}

const removeResetViewListener = (
    onResetView: (event: ResetViewEvent) => void
) => {
    document.removeEventListener(eventType, onResetView as any)
}

export { dispatchResetView, addResetViewListener, removeResetViewListener }
