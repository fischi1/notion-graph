import { ReactNode } from "react"
import "./Link.css"

type Props = {
    href?: string
    target?: "_blank"
    children?: ReactNode
}

const Link = ({ href, children, target }: Props) => {
    return (
        <a className="link" href={href} target={target}>
            {children}
        </a>
    )
}

export default Link
