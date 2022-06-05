import { ChangeEvent } from "react"
import "./Range.css"

type Props = {
    value: number
    onChange?: (newValue: number) => void
    min?: number
    max?: number
}

const Range = ({ value, onChange, min = 0, max = 500 }: Props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(+e.target.value)
        }
    }

    return (
        <div className="range">
            <input
                type="range"
                value={value}
                min={min}
                max={max}
                onChange={handleChange}
            />
            <span aria-hidden>{value}</span>
        </div>
    )
}

export default Range
