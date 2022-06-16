type GenerateImageDetail = {
    scale: number
}

export type GenerateImageEvent = CustomEvent<GenerateImageDetail>

const eventType = "generateImage"

const dispatchGenerateImage = (detail: GenerateImageDetail) => {
    document.dispatchEvent(new CustomEvent(eventType, { detail: detail }))
}

const addGenerateImageListener = (
    onGenerateImage: (event: GenerateImageEvent) => void
) => {
    document.addEventListener(eventType, onGenerateImage as any)
}

const removeGenerateImageListener = (
    onGenerateImage: (event: GenerateImageEvent) => void
) => {
    document.removeEventListener(eventType, onGenerateImage as any)
}

export {
    dispatchGenerateImage,
    addGenerateImageListener,
    removeGenerateImageListener
}
