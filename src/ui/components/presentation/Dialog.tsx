import { ReactNode, useLayoutEffect, useRef } from "react"
import Button from "./Button"
import "./Dialog.css"
import Heading from "./Heading"
import Panel from "./Panel"

type Props = {
    open: boolean
    onClose: () => void
    title?: ReactNode
    children?: ReactNode
}

const Dialog = ({ open, onClose, title, children }: Props) => {
    const dialogOverlayRef = useRef<HTMLDialogElement>(null)

    useLayoutEffect(() => {
        if (open) {
            dialogOverlayRef.current?.removeAttribute("open")
            dialogOverlayRef.current?.showModal()
        } else {
            dialogOverlayRef.current?.close()
        }
    }, [open])

    useLayoutEffect(() => {
        const handleClose = (e: Event) => {
            e.preventDefault()
            onClose()
        }

        const dialogOverlay = dialogOverlayRef.current

        dialogOverlay?.addEventListener("cancel", handleClose)
        if (dialogOverlay?.scrollTop) {
            dialogOverlay.scrollTop = 0
        }

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
            <div className="dialog-panel">
                <Panel>
                    <Heading id="dialog-title">{title}</Heading>
                    <div id="dialog-content">{children}</div>
                    <div className="close-dialog">
                        <Button onClick={onClose}>Close</Button>
                    </div>
                </Panel>
            </div>
        </dialog>
    )
}

export default Dialog
