import { useStoreState } from "./Store"
import Options from "../views/Options"
import ParsingFile from "../views/ParsingFile"
import SelectFile from "../views/SelectFile"
import Traversal from "../views/Traversal"
import GraphControl from "../views/GraphControl"

const Routing = () => {
    const state = useStoreState()

    switch (state.step) {
        case "selectFile":
            return <SelectFile />
        case "parsingFile":
            return <ParsingFile />
        case "options":
            return <Options />
        case "traversal":
            return <Traversal />
        case "graphControl":
            return <GraphControl />
    }

    return null
}

export default Routing
