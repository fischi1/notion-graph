import { ReactNode } from "react"
import "./Heading.css"

type Props = {
    children?: ReactNode
}

const Heading = ({ children }: Props) => {
    return <h1 className="heading">{children}</h1>
}

export default Heading
