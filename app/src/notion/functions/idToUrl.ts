const idToUrl = (id: string) => {
    return `https://notion.so/${id.replaceAll("-", "")}`
}

export default idToUrl
