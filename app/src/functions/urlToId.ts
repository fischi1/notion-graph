const urlToId = (notionUrl: string) => {
    notionUrl = notionUrl.trim()
    if (notionUrl.match(/^https:\/\/(www.)?notion.so\/.+-[0-9a-f]{32}$/)) {
        const uuidWithoutHyphen = notionUrl.substring(
            notionUrl.lastIndexOf("-") + 1
        )

        const substrings = [
            uuidWithoutHyphen.substring(0, 8),
            uuidWithoutHyphen.substring(8, 12),
            uuidWithoutHyphen.substring(12, 16),
            uuidWithoutHyphen.substring(16, 20),
            uuidWithoutHyphen.substring(20)
        ] as const

        return substrings.join("-")
    } else {
        throw new Error("url is not a valid notion url")
    }
}

export default urlToId
