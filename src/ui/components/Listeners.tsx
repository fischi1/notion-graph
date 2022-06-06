import { useEffect } from "react"
import {
    addNewPageListener,
    NewPageEvent,
    removeNewPageListener
} from "../../events/NewPageEvent"
import {
    addParsingZipDoneListener,
    ParsingZipDoneEvent,
    removeParsingZipDoneListener
} from "../../events/ParsingZipDoneEvent"
import {
    addTraversalBeginListener,
    removeTraversalBeginListener,
    TraversalBeginEvent
} from "../../events/TraversalBeginEvent"
import {
    addTraversalEndListener,
    removeTraversalEndListener,
    TraversalEndEvent
} from "../../events/TraversalEndEvent"
import { useStoreDispatch, useStoreState } from "./Store"

const Listeners = () => {
    const state = useStoreState()
    const dispatch = useStoreDispatch()

    //parsingFile
    useEffect(() => {
        const handleParsingZipDone = (event: ParsingZipDoneEvent) => {
            dispatch({ type: "parsingZipDone", root: event.detail.root })
        }

        if (state.step === "parsingFile") {
            addParsingZipDoneListener(handleParsingZipDone)
        }

        return () => {
            if (state.step === "parsingFile") {
                removeParsingZipDoneListener(handleParsingZipDone)
            }
        }
    }, [dispatch, state.step])

    //traversalBegin
    useEffect(() => {
        const handleTraversalBegin = (event: TraversalBeginEvent) => {
            dispatch({
                type: "setPageCount",
                pageCount: event.detail.pageCount
            })
        }

        addTraversalBeginListener(handleTraversalBegin)

        return () => {
            removeTraversalBeginListener(handleTraversalBegin)
        }
    }, [dispatch])

    //newPage
    useEffect(() => {
        const handleNewPage = (event: NewPageEvent) => {
            dispatch({ type: "newPageEventTriggered" })
        }

        addNewPageListener(handleNewPage)

        return () => {
            removeNewPageListener(handleNewPage)
        }
    }, [dispatch])

    //travesalEnd
    useEffect(() => {
        const handleTraversalEnd = (event: TraversalEndEvent) => {
            dispatch({ type: "travesalEnded" })
        }

        addTraversalEndListener(handleTraversalEnd)

        return () => {
            removeTraversalEndListener(handleTraversalEnd)
        }
    }, [dispatch])

    return null
}

export default Listeners
