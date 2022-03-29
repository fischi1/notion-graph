import "./TextInput.css"

type Props = {
    name: string
    label: string
    value: string
    onChange: (value: string) => void
}

const TextInput = ({ name, label, value, onChange }: Props) => {
    return (
        <div class="text-input">
            <label for={name}>{label}</label>
            <input
                type="text"
                name={name}
                id={name}
                value={value}
                // has to be used instead of onChange when using preact
                onInput={(e) => {
                    if (e.target instanceof HTMLInputElement) {
                        onChange(e.target.value)
                    }
                }}
            />
        </div>
    )
}

export default TextInput
