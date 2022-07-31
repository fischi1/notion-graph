import { useEffect, useState } from "react"
import { dispatchOptionsChange } from "../../events/OptionsChangeEvent"
import { dispatchResetView } from "../../events/ResetViewEvent"
import DropzoneWrapper from "../components/DropzoneWrapper"
import ImageGenerationForm from "../components/ImageGenerationForm"
import Button from "../components/presentation/Button"
import Checkbox from "../components/presentation/Checkbox"
import Heading from "../components/presentation/Heading"
import Panel from "../components/presentation/Panel"
import { useStoreDispatch } from "../components/Store"

const GraphControl = () => {
    const dispatch = useStoreDispatch()
    const [labelsEnabled, setLabelsEnabled] = useState(true)

    const handleResetButton = () => {
        dispatchResetView()
    }

    const handleRestartButton = () => {
        dispatch({ type: "restartWizard" })
    }

    const handleFileDrop = (file: File) => {
        dispatch({ type: "fileChosen", file: file })
    }

    useEffect(() => {
        dispatchOptionsChange({ labelsEnabled: labelsEnabled })
    }, [labelsEnabled])

    return (
        <Panel>
            <DropzoneWrapper onFile={handleFileDrop}>
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
                <div style={{ paddingTop: "1.5rem" }}>
                    <Button onClick={handleRestartButton}>
                        Import another workspace
                    </Button>
                </div>
            </DropzoneWrapper>
        </Panel>
    )
}

export default GraphControl
