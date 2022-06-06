import Store from "./components/Store"
import Listeners from "./components/Listeners"
import Routing from "./components/Routing"

const UserInterface = () => {
    return (
        <Store>
            <Routing />
            <Listeners />
        </Store>
    )
}

export default UserInterface
