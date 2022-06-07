import { FormEvent, useState } from "react"
import Button from "../components/presentation/Button"
import Checkbox from "../components/presentation/Checkbox"
import Heading from "../components/presentation/Heading"
import Panel from "../components/presentation/Panel"
import Range from "../components/presentation/Range"

const GraphControl = () => {
    const [screenshotScale, setScreenshotScale] = useState(1)

    const handleScreenshotSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log(screenshotScale)
    }

    return (
        <Panel>
            <Heading>3. Done</Heading>
            <div style={{ paddingTop: "1.5rem" }}>
                <Button>Reset view</Button>
            </div>
            <div style={{ paddingTop: "1.5rem" }}>
                <Checkbox id="show-label-checkbox">Show labels</Checkbox>
            </div>
            <form
                style={{ paddingTop: "1.3rem" }}
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
                    min={0.1}
                    max={5}
                    step={0.1}
                    id="collapse-range-input"
                />
                <Button type="submit">Generate image</Button>
            </form>
        </Panel>
    )
}

export default GraphControl
