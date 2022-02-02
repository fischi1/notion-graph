import Panel from "./components/Panel"
import "./UserInterface.css"
import { useState } from "preact/hooks"
import Button from "./components/Button"

type Props = {}

const UserInterface = ({}: Props) => {
    const [open, setOpen] = useState(false)

    if (open) {
        return <Panel onClose={() => setOpen(false)} />
    }

    return <Button onClick={() => setOpen(true)}>Menu</Button>
}

export default UserInterface
