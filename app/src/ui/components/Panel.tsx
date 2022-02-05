import Button from "./Button"
import "./Panel.css"
import TextInput from "./TextInput"
import { useState } from "preact/hooks"
import { dispatchBeginTraversal } from "../../events/BeginTraversalEvent"

type Props = { onClose: () => void }

const Panel = ({ onClose }: Props) => {
    const [inProgress, setInProgress] = useState(false)
    const [value, setValue] = useState(
        "https://www.notion.so/Had-----es-----2d7ab8c1369447c49cdfb8b438dbbafd"
    )

    const handleStart = () => {
        dispatchBeginTraversal({ notionUrl: value })
        // setInProgress(true)
    }

    return (
        <div className="panel">
            <Button onClick={onClose}>Close</Button>
            <hr />
            <br />
            {inProgress ? (
                <p>In Progress</p>
            ) : (
                <div>
                    <TextInput
                        label="Notion Url"
                        name="notion-url"
                        value={value}
                        onChange={setValue}
                    />
                    <Button onClick={handleStart}>Start</Button>
                </div>
            )}
        </div>
    )
}

export default Panel
