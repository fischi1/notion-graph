import { ReactNode } from "react"
import "./Button.css"
import clsx from "clsx"

type Props = {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    className?: string
    children: ReactNode
    type?: "button" | "submit"
}

const Button = ({
    onClick,
    disabled,
    className,
    type = "button",
    children
}: Props) => {
    return (
        <button
            type={type}
            className={clsx("button", className)}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button
