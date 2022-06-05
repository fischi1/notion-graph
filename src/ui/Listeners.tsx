import { useEffect } from "react"
import {
    addParsingZipDoneListener,
    ParsingZipDoneEvent,
    removeParsingZipDoneListener
} from "../events/ParsingZipDone"
import { useStoreDispatch, useStoreState } from "./components/Store"

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

    return null
}

export default Listeners
