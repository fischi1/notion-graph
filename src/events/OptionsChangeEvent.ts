type OptionsChangeDetail = {
    labelsEnabled?: boolean
}

export type OptionsChangeEvent = CustomEvent<OptionsChangeDetail>

const eventType = "optionsChange"

const dispatchOptionsChange = (detail: OptionsChangeDetail) => {
    document.dispatchEvent(new CustomEvent(eventType, { detail: detail }))
}

const addOptionsChangeListener = (
    onOptionsChange: (event: OptionsChangeEvent) => void
) => {
    document.addEventListener(eventType, onOptionsChange as any)
}

const removeOptionsChangeListener = (
    onOptionsChange: (event: OptionsChangeEvent) => void
) => {
    document.removeEventListener(eventType, onOptionsChange as any)
}

export {
    dispatchOptionsChange,
    addOptionsChangeListener,
    removeOptionsChangeListener
}
