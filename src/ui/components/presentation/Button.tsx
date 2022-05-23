import { ReactNode } from "react"

type Props = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    children?: ReactNode
}

const Button = ({ onClick, children }: Props) => {
    return <button onClick={onClick}>{children}</button>
}

export default Button
