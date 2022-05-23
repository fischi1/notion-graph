import { ReactNode } from "react"
import "./Panel.css"

type Props = {
    children?: ReactNode
}

const Panel = ({ children }: Props) => {
    return (
        <div className="panel">
            <div className="corner corner-top-left" />
            <div className="corner corner-bottom-left" />
            <div className="border border-top" />
            <div className="border border-left" />
            <div className="border border-bottom" />
            {children}
        </div>
    )
}

export default Panel
