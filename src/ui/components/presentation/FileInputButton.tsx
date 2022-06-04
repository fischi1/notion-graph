import { ChangeEvent, ReactNode, useEffect, useRef } from "react"
import "./Button.css"
import "./FileInputButton.css"

type Props = {
    accept?: string
    onSelected?: (file: File) => void
    children: ReactNode
}

const FileInputButton = ({ accept, onSelected, children }: Props) => {
    const labelRef = useRef<HTMLLabelElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleKeypress = (e: KeyboardEvent) => {
            e.preventDefault()
            if (e.key === " ") inputRef.current?.click()
        }

        const label = labelRef.current

        label?.addEventListener("keyup", handleKeypress)

        return () => {
            label?.removeEventListener("keyup", handleKeypress)
        }
    }, [])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0)

        if (file && onSelected) {
            onSelected(file)
        }
    }

    return (
        <label
            className="button file-input-button"
            tabIndex={0}
            role="button"
            ref={labelRef}
        >
            <input
                type="file"
                accept={accept}
                ref={inputRef}
                onChange={handleChange}
            />
            {children}
        </label>
    )
}

export default FileInputButton
