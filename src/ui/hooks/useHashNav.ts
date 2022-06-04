import { useCallback, useEffect, useState } from "react"

const useHashNav = (hashString: string) => {
    const [stringFound, setStringFound] = useState<
        "notFound" | "initial" | "afterHashChange"
    >(() => (location.hash.includes(hashString) ? "initial" : "notFound"))

    useEffect(() => {
        const handleHashChange = () => {
            if (location.hash.includes(hashString)) {
                setStringFound("afterHashChange")
            } else {
                setStringFound("notFound")
            }
        }

        addEventListener("hashchange", handleHashChange)

        return () => {
            removeEventListener("hashchange", handleHashChange)
        }
    }, [])

    const goBack = useCallback(() => {
        if (stringFound === "afterHashChange") {
            history.back()
        } else {
            //pushState() doesn't trigger hashchange, whereas back() does
            history.pushState(
                "",
                document.title,
                location.pathname + location.search
            )
            setStringFound("notFound")
        }
    }, [stringFound])

    const found = stringFound !== "notFound"

    return [found, goBack] as const
}

export default useHashNav
