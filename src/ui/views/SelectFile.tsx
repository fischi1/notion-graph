import SelectFileDialogContent from "../components/dialogContent/SelectFileDialogContent"
import DropzoneWrapper from "../components/DropzoneWrapper"
import Dialog from "../components/presentation/Dialog"
import FileInputButton from "../components/presentation/FileInputButton"
import Heading from "../components/presentation/Heading"
import Link from "../components/presentation/Link"
import Panel from "../components/presentation/Panel"
import { useStoreDispatch } from "../components/Store"
import useHashNav from "../hooks/useHashNav"

const SelectFile = () => {
    const dispatch = useStoreDispatch()
    const [dialogOpen, back] = useHashNav("#zip-help-modal")

    const handleFileChosen = (file: File) => {
        dispatch({ type: "fileChosen", file })
    }

    return (
        <Panel>
            <DropzoneWrapper onFile={handleFileChosen}>
                <Heading>1. Choose or drop Notion-Export ZIP</Heading>
                <Link href="#zip-help-modal">
                    Where can I get this file from?
                </Link>
                <br />
                <br />
                <div>
                    <FileInputButton
                        accept={
                            import.meta.env.PROD
                                ? "application/zip"
                                : "application/zip,application/json"
                        }
                        onSelected={handleFileChosen}
                    >
                        Choose file
                    </FileInputButton>
                </div>
            </DropzoneWrapper>
            <Dialog
                open={dialogOpen}
                onClose={back}
                title="Exporting Notion content"
            >
                <SelectFileDialogContent />
            </Dialog>
        </Panel>
    )
}

export default SelectFile
