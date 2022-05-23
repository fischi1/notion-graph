import { useState } from "react"
import Button from "./components/Button"
import Panel from "./components/Panel"
import "./UserInterface.css"

type Props = {}

const UserInterface = ({}: Props) => {
    const [open, setOpen] = useState(true)

    if (open) {
        return <Panel onClose={() => setOpen(false)} />
    }

    return <Button onClick={() => setOpen(true)}>Menu</Button>
}

export default UserInterface
