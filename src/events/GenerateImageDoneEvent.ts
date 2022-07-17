type GenerateImageDoneDetail = {
    error?: "imageScaleTooBig"
}

export type GenerateImageDoneEvent = CustomEvent<GenerateImageDoneDetail>

const eventType = "generateImageDone"

const dispatchGenerateImageDone = (detail: GenerateImageDoneDetail) => {
    document.dispatchEvent(new CustomEvent(eventType, { detail: detail }))
}

const addGenerateImageDoneListener = (
    onGenerateImageDone: (event: GenerateImageDoneEvent) => void
) => {
    document.addEventListener(eventType, onGenerateImageDone as any)
}

const removeGenerateImageDoneListener = (
    onGenerateImageDone: (event: GenerateImageDoneEvent) => void
) => {
    document.removeEventListener(eventType, onGenerateImageDone as any)
}

export {
    dispatchGenerateImageDone,
    addGenerateImageDoneListener,
    removeGenerateImageDoneListener
}
