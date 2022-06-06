import DotDotDot from "../components/presentation/DotDotDot"
import Heading from "../components/presentation/Heading"
import Panel from "../components/presentation/Panel"
import { useStoreState } from "../components/Store"

const Traversal = () => {
    const { pageCount, pagesGenerated } = useStoreState()

    return (
        <Panel>
            <Heading>
                Generating graph
                <DotDotDot />
            </Heading>
            <p>
                {pageCount === 0 ? (
                    <>&nbsp;</>
                ) : (
                    <>
                        <b>{pagesGenerated}</b> out of <b>{pageCount}</b>
                    </>
                )}
            </p>
        </Panel>
    )
}

export default Traversal
