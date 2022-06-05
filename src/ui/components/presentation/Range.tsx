import { ChangeEvent } from "react"
import "./Range.css"

type Props = {
    value: number
    onChange?: (newValue: number) => void
    min?: number
    max?: number
    id?: string
    ariaLabelledBy?: string
}

const Range = ({
    value,
    onChange,
    min = 0,
    max = 500,
    id,
    ariaLabelledBy
}: Props) => {
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
                id={id}
                aria-labelledby={ariaLabelledBy}
            />
            <span aria-hidden>{value}</span>
        </div>
    )
}

export default Range
