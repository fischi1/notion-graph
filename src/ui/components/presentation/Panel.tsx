import { CSSProperties, ReactNode } from "react"
import "./Panel.css"
import clsx from "clsx"

type Props = {
    style?: CSSProperties
    className?: string
    children?: ReactNode
}

const Panel = ({ style, className, children }: Props) => {
    return (
        <div className={clsx("panel", className)} style={style}>
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
