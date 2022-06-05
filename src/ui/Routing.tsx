import { useStoreState } from "./components/Store"
import SelectFile from "./views/SelectFile"

const Routing = () => {
    const state = useStoreState()

    switch (state.step) {
        case "selectFile":
            return <SelectFile />
    }
}

export default Routing
