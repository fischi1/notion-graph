import { ReactNode } from "react"
import "./Button.css"
import clsx from "clsx"

type Props = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    className?: string
    children?: ReactNode
}

const Button = ({ onClick, disabled, className, children }: Props) => {
    return (
        <button
            className={clsx("button", className)}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
