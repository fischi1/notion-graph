import Store from "./components/Store"
import Listeners from "./components/Listeners"
import Routing from "./components/Routing"
import About from "./components/About"

const UserInterface = () => {
    return (
        <Store>
            <Routing />
            <About />
            <Listeners />
        </Store>
    )
}

export default UserInterface
