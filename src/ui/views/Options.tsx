import { FormEvent, useState } from "react"
import { dispatchTraversePages } from "../../events/TraversePagesEvent"
import { TraversalType } from "../../types/TraversalType"
import CollapsingPagesDialogContent from "../components/dialogContent/CollapsingPagesDialogContent"
import JsonDownloadLink from "../components/JsonDownloadLink"
import PageCount from "../components/PageCount"
import PageCountAfterCollapse from "../components/PageCountAfterCollapse"
import Button from "../components/presentation/Button"
import Dialog from "../components/presentation/Dialog"
import Heading from "../components/presentation/Heading"
import Link from "../components/presentation/Link"
import Panel from "../components/presentation/Panel"
import Radio from "../components/presentation/Radio"
import Range from "../components/presentation/Range"
import { useStoreDispatch, useStoreState } from "../components/Store"
import useHashNav from "../hooks/useHashNav"

const Options = () => {
    const state = useStoreState()
    const dispatch = useStoreDispatch()
    const [traversalType, setTraversalType] =
        useState<TraversalType>("breadth-first")
    const [collapseThreshold, setCollapseThreshold] = useState(20)
    const [delay, setDelay] = useState(50)

    const [open, back] = useHashNav("#collapse-help-modal")

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (!state.pages) {
            console.log("state.pages is null")
            return
        }

        dispatchTraversePages({
            pages: state.pages,
            traversalType: traversalType,
            collapseThreshold: collapseThreshold,
            nodeAddDelay: delay
        })
        dispatch({ type: "optionsDone" })
    }

    return (
        <Panel>
            <Heading>2. Options</Heading>
            <div style={{ paddingTop: "0rem" }}>
                Found&nbsp;
                <b>
                    <PageCount />
                </b>
                &nbsp;pages
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{ paddingTop: "1.7rem" }}>
                    <p id="traversal-label">Traversal</p>
                    <div role="radiogroup" aria-labelledby="traversal-label">
                        <Radio
                            id="breadth-first-radio-input"
                            name="traversal-radio"
                            value={"breadth-first" as TraversalType}
                            onChange={setTraversalType}
                            checked={traversalType === "breadth-first"}
                        >
                            Breadth-first
                        </Radio>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <Radio
                            id="depth-first-radio-input"
                            name="traversal-radio"
                            value={"depth-first" as TraversalType}
                            onChange={setTraversalType}
                            checked={traversalType === "depth-first"}
                        >
                            Depth-first
                        </Radio>
                    </div>
                </div>
                <div style={{ paddingTop: "1.7rem" }}>
                    <label
                        style={{ display: "block" }}
                        htmlFor="collapse-range-input"
                    >
                        Collapse pages with more than <b>{collapseThreshold}</b>
                        &nbsp;children
                    </label>
                    <Link href="#collapse-help-modal">
                        What is this setting for?
                    </Link>
                    <Range
                        value={collapseThreshold}
                        onChange={setCollapseThreshold}
                        min={3}
                        max={50}
                        id="collapse-range-input"
                    />
                    <div>
                        Results in&nbsp;
                        <b>
                            <PageCountAfterCollapse
                                collapseThreshold={collapseThreshold}
                            />
                        </b>
                        &nbsp;remaining pages
                    </div>
                </div>
                <div style={{ paddingTop: "1.7rem" }}>
                    <label htmlFor="delay-range-input">
                        Interval in milliseconds between adding nodes
                    </label>
                    <Range
                        value={delay}
                        onChange={setDelay}
                        min={5}
                        id="delay-range-input"
                    />
                </div>
                <div style={{ paddingTop: "1.7rem" }}>
                    <Button type="submit">Generate Graph</Button>
                </div>
            </form>
            <Dialog open={open} onClose={back} title="Collapsing pages">
                <CollapsingPagesDialogContent />
            </Dialog>
            {import.meta.env.DEV && <JsonDownloadLink />}
        </Panel>
    )
}

export default Options
