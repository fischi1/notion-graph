import clsx from "clsx"
import { ReactNode } from "react"
import "./DialogContent.css"

type Props = {
    children: ReactNode
    className?: string
}

const DialogContent = ({ className, children }: Props) => (
    <div className={clsx("dialog-content", className)}>{children}</div>
)

export default DialogContent
