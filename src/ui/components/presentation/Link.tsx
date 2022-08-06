import { ReactNode } from "react"
import "./Link.css"

type Props = {
    href?: string
    target?: "_blank"
    download?: string
    rel?: string
    children?: ReactNode
}

const Link = ({ href, target, download, rel, children }: Props) => {
    return (
        <a
            className="link"
            href={href}
            target={target}
            download={download}
            rel={rel}
        >
            {children}
        </a>
    )
}

export default Link
