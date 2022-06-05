import {
    createContext,
    Dispatch,
    ReactNode,
    useContext,
    useReducer
} from "react"
import { dispatchParsingZipStart } from "../../events/ParsingZipStart"
import { Page } from "../../types/Page"

type State = {
    step: "selectFile" | "parsingFile" | "options"
    file: File | null
    pages: Page | null
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

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "fileChosen":
            dispatchParsingZipStart({ file: action.file })
            return { ...state, file: action.file, step: "parsingFile" }
        case "parsingZipDone":
            return { ...state, pages: action.root, step: "options" }
    }
}

const initalState: State = {
    step: "selectFile",
    file: null,
    pages: null
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
