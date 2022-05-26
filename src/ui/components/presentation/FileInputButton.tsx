import { ReactNode, useEffect, useRef } from "react"
import "./FileInputButton.css"

type Props = {
    id: string
    children: ReactNode
}

const FileInputButton = ({ id, children }: Props) => {
    const labelRef = useRef<HTMLLabelElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        labelRef.current?.focus()
    }, [])

    useEffect(() => {
        const handleKeypress = (e: KeyboardEvent) => {
            e.preventDefault()
            if (e.key === " ") inputRef.current?.click()
        }

        labelRef.current?.addEventListener("keyup", handleKeypress)

        return () => {
            labelRef.current?.removeEventListener("keyup", handleKeypress)
        }
    }, [])

    return (
        <label
            className="button file-input-button"
            tabIndex={0}
            role="button"
            ref={labelRef}
        >
            <input type="file" ref={inputRef} />
            {children}
        </label>
    )
}

export default FileInputButton
