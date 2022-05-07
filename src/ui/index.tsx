import "@fontsource/asap"
import "@fontsource/source-sans-pro"
import { render } from "preact"
import "./index.css"
import UserInterface from "./UserInterface"

render(<UserInterface />, document.getElementById("ui")!)
