import "@fontsource/source-sans-pro"
import React from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import UserInterface from "./UserInterface"

const container = document.getElementById("ui")!
const root = createRoot(container)
root.render(
    <React.StrictMode>
        <UserInterface />
    </React.StrictMode>
)
