import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer
} from "react"
import { dispatchParsingZipStart } from "../../events/ParsingZipStartEvent"
import { Page } from "../../types/Page"

type State = {
    step:
        | "selectFile"
        | "parsingFile"
        | "options"
        | "traversal"
        | "graphControl"
    file: File | null
    pages: Page | null
    pageCount: number
    pagesGenerated: number
}

type Action =
    | {
          type: "fileChosen"
          file: File
      }
    | {
          type: "parsingZipDone"
          root: Page
      }
    | {
          type: "optionsDone"
      }
    | {
          type: "setPageCount"
          pageCount: number
      }
    | {
          type: "newPageEventTriggered"
      }
    | {
          type: "travesalEnded"
      }

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "fileChosen":
            dispatchParsingZipStart({ file: action.file })
            return { ...state, file: action.file, step: "parsingFile" }
        case "parsingZipDone":
            return { ...state, pages: action.root, step: "options" }
        case "optionsDone":
            return { ...state, step: "traversal" }
        case "setPageCount":
            return { ...state, pageCount: action.pageCount, pagesGenerated: 0 }
        case "newPageEventTriggered":
            return {
                ...state,
                pagesGenerated: state.pagesGenerated + 1
            }
        case "travesalEnded":
            return { ...state, step: "graphControl" }
    }
}

const initalState: State = {
    step: "selectFile",
    file: null,
    pages: null,
    pageCount: 0,
    pagesGenerated: 0
}

const StateContext = createContext(initalState)
const DispatchContext = createContext<Dispatch<Action> | null>(null)

type Props = {
    children: ReactNode
}

const Store = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initalState)

    return (
        <DispatchContext.Provider value={dispatch}>
            <StateContext.Provider value={state}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}

const useStoreState = () => {
    return useContext(StateContext)
}

const useStoreDispatch = () => {
    const dispatch = useContext(DispatchContext)
    if (!dispatch) throw new Error("Must be called within a Store")
    return dispatch
}

export default Store

export { useStoreState, useStoreDispatch }
