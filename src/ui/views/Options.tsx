import { FormEvent, useState } from "react"
import { TraversalType } from "../../types/TraversalType"
import Button from "../components/presentation/Button"
import Dialog from "../components/presentation/Dialog"
import Heading from "../components/presentation/Heading"
import Link from "../components/presentation/Link"
import Panel from "../components/presentation/Panel"
import Radio from "../components/presentation/Radio"
import Range from "../components/presentation/Range"
import useHashNav from "../hooks/useHashNav"

const Options = () => {
    const [traversalType, setTraversalType] =
        useState<TraversalType>("breadth-first")
    const [collapseThreshold, setCollapseThreshold] = useState(20)
    const [delay, setDelay] = useState(50)

    const [open, back] = useHashNav("#collapse-help-modal")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log("submit", e)
    }

    return (
        <Panel>
            <Heading>2. Options</Heading>
            <form onSubmit={handleSubmit}>
                <div style={{ paddingTop: "1.5rem" }}>
                    <p>Traversal</p>
                    <Radio
                        id="breadth-first-radio"
                        name="traversal-radio"
                        value={"breadth-first" as TraversalType}
                        onChange={setTraversalType}
                        checked={traversalType === "breadth-first"}
                    >
                        Breadth-first
                    </Radio>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Radio
                        id="depth-first-radio"
                        name="traversal-radio"
                        value={"depth-first" as TraversalType}
                        onChange={setTraversalType}
                        checked={traversalType === "depth-first"}
                    >
                        Depth-first
                    </Radio>
                </div>
                <div style={{ paddingTop: "1.5rem" }}>
                    <p>
                        Collapse pages with more than <b>{collapseThreshold}</b>
                        &nbsp;pages
                    </p>
                    <Link href="#collapse-help-modal">What does this do?</Link>
                    <Range
                        value={collapseThreshold}
                        onChange={setCollapseThreshold}
                        min={2}
                        max={50}
                    />
                </div>
                <div style={{ paddingTop: "1.5rem" }}>
                    <p>Interval in milliseconds between adding nodes</p>
                    <Range value={delay} onChange={setDelay} min={5} />
                </div>
                <div style={{ padding: "1.5rem 0 5px 0" }}>
                    <Button type="submit">Generate Graph</Button>
                </div>
            </form>
            <Dialog open={open} onClose={back} title="Collapsing pages">
                TODO content
            </Dialog>
        </Panel>
    )
}

export default Options
