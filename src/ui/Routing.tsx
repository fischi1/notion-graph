import { useStoreState } from "./components/Store"
import Options from "./views/Options"
import ParsingFile from "./views/ParsingFile"
import SelectFile from "./views/SelectFile"

const Routing = () => {
    const state = useStoreState()

    switch (state.step) {
        case "selectFile":
            return <SelectFile />
        case "parsingFile":
            return <ParsingFile />
        case "options":
            return <Options />
    }

    return null
}

export default Routing
