import { useEffect, useState } from "react"

const DOT_COUNT = 3
const INTERVAL = 350

const DotDotDot = () => {
    const [dotCount, setDotCount] = useState(0)

    useEffect(() => {
        const timeout = setInterval(() => {
            setDotCount((dotCount) => (dotCount + 1) % DOT_COUNT)
        }, INTERVAL)

        return () => {
            clearInterval(timeout)
        }
    }, [])

    return (
        <>
            {".".repeat(dotCount + 1)}
            <span style={{ visibility: "hidden" }}>
                {".".repeat(DOT_COUNT - dotCount - 1)}
            </span>
        </>
    )
}

export default DotDotDot
