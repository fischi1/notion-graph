import { useState } from "react"
import DebugParsing from "./components/DebugParsing"
import Button from "./components/presentation/Button"
import Checkbox from "./components/presentation/Checkbox"
import Dialog from "./components/presentation/Dialog"
import FileInputButton from "./components/presentation/FileInputButton"
import Heading from "./components/presentation/Heading"
import Link from "./components/presentation/Link"
import Panel from "./components/presentation/Panel"
import Radio from "./components/presentation/Radio"
import Range from "./components/presentation/Range"
import useHashNav from "./hooks/useHashNav"
import "./UserInterface.css"

type RadioType = "enabled" | "disabled"

const UserInterface = () => {
    const [checked, setChecked] = useState(false)
    const [radio, setRadio] = useState<RadioType>("enabled")
    const [file, setFile] = useState<File | null>(null)
    const [range, setRange] = useState(50)

    const [open, back] = useHashNav("#zip-help-modal")

    return (
        <>
            <Panel>
                <Heading>1. Choose or drop Notion-Export ZIP</Heading>
                <Link href="#zip-help-modal">How can i generate this?</Link>
                <br />
                <Link href="#zip-help-modal" target="_blank">
                    How can i generate this? (new Tab)
                </Link>
                <div style={{ padding: "1em" }}>
                    <Button onClick={() => alert("Hello World!")}>
                        Say Hello!
                    </Button>
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
                <div style={{ margin: "1em" }}>
                    <Radio
                        id="radio-enabled"
                        name="text-radio"
                        value={"enabled" as RadioType}
                        checked={radio === "enabled"}
                        onChange={setRadio}
                    >
                        Enabled
                    </Radio>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Radio
                        id="radio-disabled"
                        name="text-radio"
                        value={"disabled" as RadioType}
                        checked={radio === "disabled"}
                        onChange={setRadio}
                    >
                        Disabled
                    </Radio>
                </div>
                <div style={{ margin: "1em" }}>
                    <FileInputButton
                        accept="application/zip,application/json"
                        onSelected={setFile}
                    >
                        {file === null ? (
                            "Select a zip file"
                        ) : (
                            <>
                                Chosen file: <b>{file.name}</b>
                            </>
                        )}
                    </FileInputButton>
                </div>
                <div style={{ margin: "1em" }}>
                    <Range value={range} onChange={setRange} />
                </div>
                <br />
                <br />
                <br />
                <br />
                <DebugParsing />
            </Panel>
            <Dialog open={open} onClose={back}>
                <p>Hello World!</p>
                <br />
                <FileInputButton
                    accept="application/zip,application/json"
                    onSelected={setFile}
                >
                    {file === null ? (
                        "Select a zip file"
                    ) : (
                        <>
                            Chosen file: <b>{file.name}</b>
                        </>
                    )}
                </FileInputButton>
                <br />
                <br />
                <Range value={range} onChange={setRange} />
                <br />
                <Button>Random Button</Button>&nbsp;&nbsp;
                <Button>Random Button</Button>
                <br />
                <br />
                <Button>Random Button</Button>&nbsp;&nbsp;
                <Button>Random Button</Button>
                <br />
                <br />
            </Dialog>
        </>
    )
}

export default UserInterface
