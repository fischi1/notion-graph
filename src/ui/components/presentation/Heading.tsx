import { ReactNode } from "react"
import "./Heading.css"

type Props = {
    id?: string
    children?: ReactNode
}

const Heading = ({ id, children }: Props) => {
    return (
        <h1 id={id} className="heading">
            {children}
        </h1>
    )
}

export default Heading
