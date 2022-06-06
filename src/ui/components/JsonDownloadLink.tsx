import { useMemo } from "react"
import Link from "./presentation/Link"
import { useStoreState } from "./Store"

const JsonDownloadLink = () => {
    const state = useStoreState()

    const download = useMemo(() => {
        const file = state.file
        const pages = state.pages

        if (!pages || !file) {
            return null
        }

        const blob = new Blob([JSON.stringify(pages, null, 4)], {
            type: "application/json"
        })

        return {
            jsonDownloadUrl: window.URL.createObjectURL(blob),
            name: file.name.substring(0, file.name.length - 3) + "json"
        }
    }, [state.file, state.pages])

    if (!download) return <>Nothing parsed</>
    else {
        return (
            <Link href={download.jsonDownloadUrl} download={download.name}>
                {download.name}
            </Link>
        )
    }
}

export default JsonDownloadLink
