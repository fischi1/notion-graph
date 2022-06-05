import { useEffect, useState } from "react"
import countPages from "../../functions/countPages"
import { useStoreState } from "./Store"

const PageCount = () => {
    const state = useStoreState()
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (state.pages) {
            setCount(countPages(state.pages))
        }
    }, [state.pages])

    if (!state.pages) return null

    return <>{count}</>
}

export default PageCount
