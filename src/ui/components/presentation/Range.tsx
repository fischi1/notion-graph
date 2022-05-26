import { ChangeEvent } from "react"
import "./Range.css"

type Props = {
    value: number
    onChange?: (newValue: number) => void
}

const Range = ({ value, onChange }: Props) => {
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
                min={0}
                max={500}
                onChange={handleChange}
            />
            <span aria-hidden>{value}</span>
        </div>
    )
}

export default Range
