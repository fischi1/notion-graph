import { ReactNode } from "react"
import "./Checkbox.css"

type Props = {
    id: string
    checked?: boolean
    onChange?: (newValue: boolean) => void
    children: ReactNode
}

const Checkbox = ({ id, checked, onChange, children }: Props) => {
    return (
        <div className="checkbox">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onChange && onChange(e.target.checked)}
            />
            <label htmlFor={id}>&nbsp;&nbsp;&nbsp;{children}</label>
        </div>
    )
}

export default Checkbox
