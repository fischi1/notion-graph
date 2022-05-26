import { useState } from "react"
import DebugParsing from "./components/DebugParsing"
import Button from "./components/presentation/Button"
import Checkbox from "./components/presentation/Checkbox"
import Heading from "./components/presentation/Heading"
import Link from "./components/presentation/Link"
import Panel from "./components/presentation/Panel"
import "./UserInterface.css"

type Props = {}

const UserInterface = ({}: Props) => {
    const [checked, setChecked] = useState(false)

    return (
        <Panel>
            <Heading>1. Choose or drop Notion-Export ZIP</Heading>
            <Link href="#zip-help-modal">How can i generate this?</Link>
            <div style={{ padding: "1em" }}>
                <Button>Normal button</Button>
            </div>
            <div style={{ paddingBottom: "1em" }}>
                <Button disabled>Disabled button</Button>
            </div>
            <div style={{ margin: "1em" }}>
                <Checkbox
                    id="test-checkbox"
                    checked={checked}
                    onChange={setChecked}
                >
                    Hello World Checkbox, current value:{" "}
                    <code>{checked + ""}</code>
                </Checkbox>
            </div>
            <DebugParsing />
        </Panel>
    )
}

export default UserInterface
