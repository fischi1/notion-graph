import Button from "./Button"
import "./Panel.css"

type Props = { onClose: () => void }

const Panel = ({ onClose }: Props) => {
    return (
        <div className="panel">
            <Button onClick={onClose}>Close</Button>
            <div>Hello world</div>
            <br />
            <div>
                <button>Start</button>
            </div>
            <div>
                <input type="text" name="link" id="link" />
            </div>
        </div>
    )
}

export default Panel
