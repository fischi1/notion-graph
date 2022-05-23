import { useEffect, useRef, useState } from "react"
import { dispatchBeginTraversal } from "../../events/BeginTraversalEvent"
import { addEndTraversalListener } from "../../events/EndTraversalEvent"
import Button from "./Button"
import JsonDownloadLink from "./JsonDownloadLink"
import "./Panel.css"

type Props = {}

const Panel = ({}: Props) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [inProgress, setInProgress] = useState(false)

    const handleStart = () => {
        const file = fileInputRef.current?.files?.item(0) ?? null
        if (!file) return
        dispatchBeginTraversal({ file })
        setInProgress(true)
    }

    useEffect(() => {
        addEndTraversalListener(() => setInProgress(false))
    }, [])

    return (
        <div className="panel">
            <div className="corner corner-top-left" />
            <div className="corner corner-bottom-left" />
            <div className="border border-top" />
            <div className="border border-left" />
            <div className="border border-bottom" />
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
                            ref={fileInputRef}
                        />
                    </div>
                    <Button onClick={handleStart}>Start</Button>
                </div>
            )}
            <br />
            <br />
            <div>
                <JsonDownloadLink />
            </div>
        </div>
    )
}

export default Panel
