const uuidNoDashesRegex = /[0-9a-f]{32}/

const stringToId = (string: string) => {
    const matches = uuidNoDashesRegex.exec(string)

    if (!matches || matches.length === 0) return null

    const uuidWithoutHyphen = matches[matches.length - 1]

    const substrings = [
        uuidWithoutHyphen.substring(0, 8),
        uuidWithoutHyphen.substring(8, 12),
        uuidWithoutHyphen.substring(12, 16),
        uuidWithoutHyphen.substring(16, 20),
        uuidWithoutHyphen.substring(20)
    ] as const

    return substrings.join("-")
}

export default stringToId
