import type { ComponentChildren } from "preact"

type Props = {
    onClick?: JSX.MouseEventHandler<HTMLButtonElement>
    children?: ComponentChildren
}

const Button = ({ onClick, children }: Props) => {
    return <button onClick={onClick}>{children}</button>
}

export default Button
