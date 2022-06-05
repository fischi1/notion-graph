import { FC, useEffect, useRef, useState } from "react"
import { dispatchBeginTraversal } from "../../events/BeginTraversalEvent"
import { addEndTraversalListener } from "../../events/EndTraversalEvent"
import Button from "../components/presentation/Button"
import JsonDownloadLink from "../components/JsonDownloadLink"

type Props = {}

const DebugParsing: FC<Props> = () => {
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
        <>
            {inProgress ? (
                <p>In Progress</p>
            ) : (
                <div>
                    <div>
                        <input
                            type="file"
                            name="input-file"
                            id="input-file"
                            accept="application/zip,application/json"
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
        </>
    )
}

export default DebugParsing
