import { render } from "preact"
import UserInterface from "./UserInterface"
import "@fontsource/asap"
import "./index.css"

render(<UserInterface />, document.getElementById("ui")!)
