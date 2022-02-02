import Button from "./Button"
import "./Panel.css"
import TextInput from "./TextInput"

type Props = { onClose: () => void }

const Panel = ({ onClose }: Props) => {
    return (
        <div className="panel">
            <Button onClick={onClose}>Close</Button>
            <hr />
            <br />
            <p>Either</p>
            <ul>
                <li>
                    <Button>Use output.json</Button>
                </li>
                <li>
                    <TextInput
                        label="Enter Notion Url"
                        name="notion-url"
                        value=""
                        onChange={() => {}}
                    />
                </li>
            </ul>
        </div>
    )
}

export default Panel
