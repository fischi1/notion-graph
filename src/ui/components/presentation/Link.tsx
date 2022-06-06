import { ReactNode } from "react"
import "./Link.css"

type Props = {
    href?: string
    target?: "_blank"
    download?: string
    children?: ReactNode
}

const Link = ({ href, target, download, children }: Props) => {
    return (
        <a className="link" href={href} target={target} download={download}>
            {children}
        </a>
    )
}

export default Link
