import "@fontsource/source-sans-pro"
import { createRoot } from "react-dom/client"
import "./index.css"
import UserInterface from "./UserInterface"

const container = document.getElementById("ui")!
const root = createRoot(container)
root.render(<UserInterface />)
