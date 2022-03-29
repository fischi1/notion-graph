import { useEffect, useState } from "preact/hooks"
import { dispatchBeginTraversal } from "../../events/BeginTraversalEvent"
import { addEndTraversalListener } from "../../events/EndTraversalEvent"
import Button from "./Button"
import "./Panel.css"

type Props = { onClose: () => void }

const Panel = ({ onClose }: Props) => {
    const [inProgress, setInProgress] = useState(false)

    const handleStart = () => {
        dispatchBeginTraversal({ notionUrl: "" })
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
