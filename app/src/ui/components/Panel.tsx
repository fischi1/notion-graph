import Button from "./Button"
import "./Panel.css"
import TextInput from "./TextInput"
import { useState, useEffect } from "preact/hooks"
import { dispatchBeginTraversal } from "../../events/BeginTraversalEvent"
import { addEndTraversalListener } from "../../events/EndTraversalEvent"

type Props = { onClose: () => void }

const Panel = ({ onClose }: Props) => {
    const [inProgress, setInProgress] = useState(false)
    const [value, setValue] = useState(
        "https://www.notion.so/CV-cb54324924df43059ea2ff39276471d6"
    )

    const handleStart = () => {
        dispatchBeginTraversal({ notionUrl: value })
        setInProgress(true)
    }

    useEffect(() => {
        addEndTraversalListener(() => setInProgress(false))
    }, [setInProgress])

    return (
        <div className="panel">
            {inProgress ? (
                <p>In Progress</p>
            ) : (
                <div>
                    <div>
                        <input
                            type="file"
                            name="input-file"
                            id="input-file"
                            accept="application/zip"
                        />
                    </div>
                    <Button onClick={handleStart}>Start</Button>
                </div>
            )}
        </div>
    )
}

export default Panel
