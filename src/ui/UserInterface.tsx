import DebugParsing from "./components/DebugParsing"
import Heading from "./components/presentation/Heading"
import Panel from "./components/presentation/Panel"
import "./UserInterface.css"

type Props = {}

const UserInterface = ({}: Props) => {
    return (
        <Panel>
            <Heading>1. Choose or drop Notion-Export ZIP</Heading>
            <DebugParsing />
        </Panel>
    )
}

export default UserInterface
