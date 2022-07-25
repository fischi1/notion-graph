import { useDropzone } from "react-dropzone"
import SelectFileDialogContent from "../components/dialogContent/SelectFileDialogContent"
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

    const accept: Record<string, string[]> = {}

    accept["application/zip"] = [".zip"]

    if (!import.meta.env.PROD) {
        accept["application/json"] = [".json"]
    }

    const { getRootProps, isDragActive } = useDropzone({
        accept: accept,
        noClick: true,
        noKeyboard: true,
        multiple: false,
        onDropAccepted(files) {
            console.log("dropped", files)
            if (files.length === 1) {
                handleFileChosen(files[0])
            }
        }
    })

    return (
        <Panel>
            <div
                {...getRootProps()}
                role={undefined}
                style={{
                    position: "relative"
                }}
            >
                {isDragActive && (
                    <div
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        Drop here
                    </div>
                )}
                <div
                    style={{ visibility: isDragActive ? "hidden" : undefined }}
                >
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
                </div>
                <Dialog
                    open={dialogOpen}
                    onClose={back}
                    title="Exporting Notion content"
                >
                    <SelectFileDialogContent />
                </Dialog>
            </div>
        </Panel>
    )
}

export default SelectFile
