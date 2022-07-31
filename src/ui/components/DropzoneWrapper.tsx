import { ReactNode } from "react"
import { useDropzone } from "react-dropzone"

type Props = {
    onFile: (file: File) => void
    children: ReactNode
}

const DropzoneWrapper = ({ onFile, children }: Props) => {
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
        onDropAccepted: (files) => {
            console.log("dropped", files)
            if (files.length === 1) {
                onFile(files[0])
            }
        }
    })

    return (
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
            <div style={{ visibility: isDragActive ? "hidden" : undefined }}>
                {children}
            </div>
        </div>
    )
}

export default DropzoneWrapper
