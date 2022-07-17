import { useEffect, useState } from "react"
import { dispatchOptionsChange } from "../../events/OptionsChangeEvent"
import { dispatchResetView } from "../../events/ResetViewEvent"
import ImageGenerationForm from "../components/ImageGenerationForm"
import Button from "../components/presentation/Button"
import Checkbox from "../components/presentation/Checkbox"
import Heading from "../components/presentation/Heading"
import Panel from "../components/presentation/Panel"

const GraphControl = () => {
    const [labelsEnabled, setLabelsEnabled] = useState(true)

    const handleResetButton = () => {
        dispatchResetView()
    }

    useEffect(() => {
        dispatchOptionsChange({ labelsEnabled: labelsEnabled })
    }, [labelsEnabled])

    return (
        <Panel>
            <Heading>3. Done</Heading>
            <div style={{ paddingTop: "1.5rem" }}>
                <Button onClick={handleResetButton}>Reset view</Button>
            </div>
            <div style={{ paddingTop: "1.5rem" }}>
                <Checkbox
                    id="show-label-checkbox"
                    checked={labelsEnabled}
                    onChange={setLabelsEnabled}
                >
                    Show labels
                </Checkbox>
            </div>
            <ImageGenerationForm />
        </Panel>
    )
}

export default GraphControl
