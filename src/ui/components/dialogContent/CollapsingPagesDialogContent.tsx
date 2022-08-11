import Image from "../presentation/Image"
import DialogContent from "./DialogContent"
import C01_before from "./images/C01_before.png"
import C02_after from "./images/C02_after.png"

const CollapsingPagesDialogContent = () => (
    <DialogContent>
        <p>
            This setting determines how many subpages a page can have before it
            is collapsed into one.
        </p>
        <p style={{ marginBottom: 0 }}>
            A big workspace can lead to a lot of nodes in the resulting graph.
            Having too many elements displayed at once leads to two problems.
        </p>
        <ul>
            <li>
                Performance
                <br />
                You can use this to reduce the amount of nodes. 500 - 1000
                should work without problems.
            </li>
            <li>
                Comprehensibility
                <br />
                Displaying the children of a page with a lot of entries don't
                add anything except visual clutter. This is especially important
                for databases.
            </li>
        </ul>
        <br />
        <p>
            Before
            <br />
            <Image
                src={C01_before}
                alt="Screenshot of a part of a graph BEFORE pages are collapsed"
                width={300}
                height={199}
                maxWidth={236}
            />
        </p>

        <p>
            After
            <br />
            <Image
                src={C02_after}
                alt="Screenshot of a part of a graph AFTER pages are collapsed"
                width={236}
                height={145}
            />
        </p>
    </DialogContent>
)

export default CollapsingPagesDialogContent
