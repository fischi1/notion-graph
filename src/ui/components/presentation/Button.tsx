import { ReactNode } from "react"
import "./Button.css"

type Props = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    children?: ReactNode
}

const Button = ({ onClick, disabled, children }: Props) => {
    return (
        <button className="button" onClick={onClick} disabled={disabled}>
            {children}
        </button>
    )
}

export default Button
