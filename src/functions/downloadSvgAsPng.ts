type Props = {
    filename: string
    width: number
    height: number
    backgroundColor?: string
}

/**
 * Based on https://stackoverflow.com/questions/28226677/save-inline-svg-as-jpeg-png-svg
 */
const downloadSvgAsPng = (
    svgElement: HTMLOrSVGImageElement,
    { filename, backgroundColor, width, height }: Props
) => {
    const canvas = document.createElement("canvas") as HTMLCanvasElement
    canvas.width = width
    canvas.height = height

    const ctx = canvas.getContext("2d")
    if (!ctx) return Promise.reject()

    if (backgroundColor) {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const data = new XMLSerializer().serializeToString(svgElement)

    const img = new Image()
    const svgBlob = new Blob([data], { type: "image/svg+xml;charset=utf-8" })
    const url = URL.createObjectURL(svgBlob)
    img.src = url

    return new Promise<void>((resolve, reject) => {
        img.onload = () => {
            ctx.drawImage(img, 0, 0)
            URL.revokeObjectURL(url)

            const imgURI = canvas
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream")

            const a = document.createElement("a")
            a.setAttribute("download", filename)
            a.setAttribute("href", imgURI)
            a.setAttribute("target", "_blank")

            a.click()
            resolve()
        }

        img.onerror = (event) => {
            reject(event)
        }
    })
}

export default downloadSvgAsPng
