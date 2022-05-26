import { ReactNode } from "react"
import "./Radio.css"

type Props<T extends string> = {
    id: string
    name: string
    value: T
    checked?: boolean
    onChange: (newValue: T) => void
    children: ReactNode
}

const Radio = <T extends string>({
    id,
    name,
    value,
    checked,
    onChange,
    children
}: Props<T>) => {
    return (
        <div className="radio">
            <input
                type="radio"
                name={name}
                id={id}
                value={value}
                checked={checked}
                onChange={(e) => onChange && onChange(e.target.value as T)}
            />
            <label htmlFor={id}>&nbsp;&nbsp;&nbsp;{children}</label>
        </div>
    )
}

export default Radio
