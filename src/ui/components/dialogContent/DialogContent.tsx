import { ReactNode } from "react"
import "./DialogContent.css"

type Props = {
    children: ReactNode
}

const DialogContent = ({ children }: Props) => (
    <div className="dialog-content">{children}</div>
)

export default DialogContent
