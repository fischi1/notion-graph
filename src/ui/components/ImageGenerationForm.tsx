import { FormEvent, useEffect, useState } from "react"
import {
    addGenerateImageDoneListener,
    GenerateImageDoneEvent,
    removeGenerateImageDoneListener
} from "../../events/GenerateImageDoneEvent"
import { dispatchGenerateImage } from "../../events/GenerateImageEvent"
import Button from "./presentation/Button"
import Range from "./presentation/Range"

const MIN_SCALE = 0.1
const MAX_SCALE = 5

const ImageGenerationForm = () => {
    const [status, setStatus] = useState<"idle" | "inProgress">("idle")
    const [error, setError] = useState("")
    const [screenshotScale, setScreenshotScale] = useState(1)

    const handleScreenshotSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatchGenerateImage({ scale: screenshotScale })
        setStatus("inProgress")
    }

    useEffect(() => {
        const handleDoneEvent = (event: GenerateImageDoneEvent) => {
            const detail = event.detail

            if (detail.error === "imageScaleTooBig") {
                setError("Image too big! Trying to reduce scale.")
                setScreenshotScale((scale) => {
                    const newScale = Math.max(scale - 0.5, MIN_SCALE)
                    dispatchGenerateImage({ scale: newScale })
                    return newScale
                })
            } else {
                setStatus("idle")
                setError("")
            }
        }

        addGenerateImageDoneListener(handleDoneEvent)

        return () => {
            removeGenerateImageDoneListener(handleDoneEvent)
        }
    }, [])

    return (
        <form
            style={{
                marginTop: "1.3rem",
                padding: "0.3rem 0.5rem 0.5rem 0.5rem",
                border: "1px solid grey"
            }}
            onSubmit={handleScreenshotSubmit}
        >
            <p>Export as image</p>
            <label
                style={{
                    display: "block",
                    float: "left",
                    paddingRight: "0.5rem"
                }}
                htmlFor="collapse-range-input"
            >
                Scale
            </label>
            <Range
                value={screenshotScale}
                onChange={setScreenshotScale}
                min={MIN_SCALE}
                max={MAX_SCALE}
                step={0.1}
                id="collapse-range-input"
                disabled={status === "inProgress"}
            />
            <Button type="submit" disabled={status === "inProgress"}>
                Generate image
            </Button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default ImageGenerationForm
