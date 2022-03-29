import stringToId from "./stringToId"

const urlToId = (notionUrl: string) => {
    notionUrl = notionUrl.trim()
    if (notionUrl.match(/^https:\/\/(www.)?notion.so\/.+-[0-9a-f]{32}$/)) {
        const uuidWithoutHyphen = notionUrl.substring(
            notionUrl.lastIndexOf("-") + 1
        )

        const id = stringToId(uuidWithoutHyphen)

        if (!id) {
            throw new Error(
                "url is not a valid notion url, error trying to create uuid"
            )
        }

        return id
    } else {
        throw new Error("url is not a valid notion url")
    }
}

export default urlToId
