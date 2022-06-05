import { useEffect, useState } from "react"
import collapsePageTooManyChildren from "../../functions/collapsePageTooManyChildren"
import countPages from "../../functions/countPages"
import DotDotDot from "./presentation/DotDotDot"
import { useStoreState } from "./Store"

type Props = {
    collapseThreshold: number
}

const PageCountAfterCollapse = ({ collapseThreshold }: Props) => {
    const state = useStoreState()
    const [count, setCount] = useState<number | null>(null)

    useEffect(() => {
        setCount(null)
        const timeout = setTimeout(() => {
            if (state.pages) {
                const clonedPages = structuredClone(state.pages)
                collapsePageTooManyChildren(clonedPages, collapseThreshold)
                setCount(countPages(clonedPages))
            }
        }, 500)

        return () => {
            clearTimeout(timeout)
        }
    }, [state.pages, collapseThreshold])

    if (!state.pages || count === null) {
        return <DotDotDot />
    }

    return <>{count}</>
}

export default PageCountAfterCollapse
