import "@fontsource/source-sans-pro"
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import UserInterface from "./UserInterface"

ReactDOM.render(
    <React.StrictMode>
        <UserInterface />
    </React.StrictMode>,
    document.getElementById("ui")
)
