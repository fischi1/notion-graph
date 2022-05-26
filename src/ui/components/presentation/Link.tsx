import { ReactNode } from "react"
import "./Link.css"

type Props = {
    href?: string
    children?: ReactNode
}

const Link = ({ href, children }: Props) => {
    return (
        <a href={href} className="link">
            {children}
        </a>
    )
}

export default Link
