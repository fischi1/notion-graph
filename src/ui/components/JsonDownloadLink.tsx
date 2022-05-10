import { useEffect, useState } from "preact/hooks"
import {
    addDoneParsingZipListener,
    DoneParsingZipEvent,
    removeAddDoneParsingZipListener
} from "../../events/DoneParsingZip"

type Props = {}

const JsonDownloadLink = ({}: Props) => {
    const [download, setDownload] = useState<{
        jsonDownloadUrl: string
        name: string
    } | null>(null)

    useEffect(() => {
        const handleAddDoneParsing = (event: DoneParsingZipEvent) => {
            const { file, root } = event.detail
            const blob = new Blob([JSON.stringify(root, null, 4)], {
                type: "application/json"
            })

            setDownload({
                jsonDownloadUrl: window.URL.createObjectURL(blob),
                name: file.name.substring(0, file.name.length - 3) + "json"
            })
        }

        addDoneParsingZipListener(handleAddDoneParsing)
        return () => {
            removeAddDoneParsingZipListener(handleAddDoneParsing)
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
