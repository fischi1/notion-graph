import { ReactNode } from "react"
import "./Heading.css"

type Props = {
    id?: string
    children?: ReactNode
    level?: 1 | 2
}

const Heading = ({ id, children, level = 1 }: Props) => {
    switch (level) {
        case 1:
            return (
                <h1 id={id} className="heading h1">
                    {children}
                </h1>
            )
        case 2:
            return (
                <h2 id={id} className="heading h2">
                    {children}
                </h2>
            )
    }
}

export default Heading
