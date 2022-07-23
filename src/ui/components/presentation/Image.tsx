import "./Image.css"

type Props = {
    src: string
    alt: string
    width?: number
    maxWidth?: number
    height?: number
    responsive?: boolean
}

const Image = ({ src, alt, width, maxWidth, height, responsive }: Props) => {
    return (
        <img
            src={src}
            alt={alt}
            className="image"
            style={{
                aspectRatio: `${width} / ${height}`,
                width: responsive ? "100%" : `${width}px`,
                maxWidth: maxWidth ? `${maxWidth}px` : undefined
            }}
        />
    )
}

export default Image
