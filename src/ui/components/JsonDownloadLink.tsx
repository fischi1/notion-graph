import { useEffect, useState } from "react"
import {
    addParsingZipDoneListener,
    ParsingZipDoneEvent,
    removeParsingZipDoneListener
} from "../../events/ParsingZipDone"

const JsonDownloadLink = () => {
    const [download, setDownload] = useState<{
        jsonDownloadUrl: string
        name: string
    } | null>(null)

    useEffect(() => {
        const handleAddDoneParsing = (event: ParsingZipDoneEvent) => {
            const { file, root } = event.detail
            const blob = new Blob([JSON.stringify(root, null, 4)], {
                type: "application/json"
            })

            setDownload({
                jsonDownloadUrl: window.URL.createObjectURL(blob),
                name: file.name.substring(0, file.name.length - 3) + "json"
            })
        }

        addParsingZipDoneListener(handleAddDoneParsing)
        return () => {
            removeParsingZipDoneListener(handleAddDoneParsing)
        }
    }, [])

    if (!download) return <>Nothing parsed</>
    else {
        return (
            <a href={download.jsonDownloadUrl} download={download.name}>
                {download.name}
            </a>
        )
    }
}

export default JsonDownloadLink
