import { useCallback, useEffect, useState } from "react"

const useHashNav = (hashString: string) => {
    const [stringFound, setStringFound] = useState<
        "notFound" | "initial" | "afterHashChange"
    >(() =>
        window.location.hash.includes(hashString) ? "initial" : "notFound"
    )

    useEffect(() => {
        const handleHashChange = () => {
            if (window.location.hash.includes(hashString)) {
                setStringFound("afterHashChange")
            } else {
                setStringFound("notFound")
            }
        }

        window.addEventListener("hashchange", handleHashChange)

        return () => {
            window.removeEventListener("hashchange", handleHashChange)
        }
    }, [hashString])

    const goBack = useCallback(() => {
        if (stringFound === "afterHashChange") {
            window.history.back()
        } else {
            //pushState() doesn't trigger hashchange, whereas back() does
            window.history.pushState(
                "",
                document.title,
                window.location.pathname + window.location.search
            )
            setStringFound("notFound")
        }
    }, [stringFound])

    const found = stringFound !== "notFound"

    return [found, goBack] as const
}

export default useHashNav
