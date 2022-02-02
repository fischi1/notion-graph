import "./TextInput.css"

type Props = {
    name: string
    label: string
    value: string
    onChange: JSX.GenericEventHandler<HTMLInputElement>
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
                onChange={onChange}
            />
        </div>
    )
}

export default TextInput
