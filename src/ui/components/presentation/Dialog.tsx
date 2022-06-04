import { ReactNode, useLayoutEffect, useRef } from "react"
import Button from "./Button"
import "./Dialog.css"
import Heading from "./Heading"
import Panel from "./Panel"

type Props = {
    open: boolean
    onClose: () => void
    children?: ReactNode
}

const Dialog = ({ open, onClose, children }: Props) => {
    const dialogOverlayRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        if (open) {
            dialogOverlayRef.current?.removeAttribute("open")
            //@ts-expect-error
            dialogOverlayRef.current.showModal()
        } else {
            //@ts-expect-error
            dialogOverlayRef.current.close()
        }
    }, [open])

    useLayoutEffect(() => {
        const handleClose = (e: Event) => {
            e.preventDefault()
            onClose()
        }

        const dialogOverlay = dialogOverlayRef.current

        dialogOverlay?.addEventListener("cancel", handleClose)

        return () => {
            dialogOverlay?.removeEventListener("cancel", handleClose)
        }
    }, [onClose])

    return (
        <dialog
            className="dialog-overlay"
            ref={dialogOverlayRef}
            aria-labelledby="dialog-title"
            aria-describedby="dialog-description"
        >
            <Panel className="dialog-panel">
                <Heading id="dialog-title">Site Navigation</Heading>
                <div id="dialog-content">{children}</div>
                <div className="close-dialog">
                    <Button onClick={onClose}>Close Dialog</Button>
                </div>
            </Panel>
        </dialog>
    )
}

export default Dialog
