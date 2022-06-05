import Store from "./components/Store"
import Listeners from "./Listeners"
import Routing from "./Routing"

const UserInterface = () => {
    return (
        <Store>
            <Routing />
            <Listeners />
        </Store>
    )
}

export default UserInterface
