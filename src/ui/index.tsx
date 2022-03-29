import "@fontsource/asap"
import { render } from "preact"
import "./index.css"
import UserInterface from "./UserInterface"

render(<UserInterface />, document.getElementById("ui")!)
