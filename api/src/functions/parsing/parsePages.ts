import fs from "fs"
import getPageTitle from "../../notion-api/getPageTitle"
import { NewPageDetail } from "../../types/NewPageDetail"
import { createEmptyPage } from "../../types/Page"
import idToUrl from "../idToUrl"
import parseChildrenRecursive from "./parseChildrenRecursive"

type ParsePagesSettings = {
    storeAsFile?: boolean
    onPageFound?: (pageDetail: NewPageDetail) => void
}

const parsePages = async (
    rootPageId: string,
    settings?: ParsePagesSettings
) => {
    const { storeAsFile, onPageFound } = settings ?? {}

    const root = createEmptyPage()
    root.title = (await getPageTitle(rootPageId)) ?? ""
    root.id = rootPageId
    root.url = idToUrl(rootPageId)

    if (onPageFound) {
        onPageFound({
            id: rootPageId,
            title: root.title,
            depth: 0,
            url: root.url
        })
    }

    const startTime = new Date().getTime()
    await parseChildrenRecursive(root, 0, onPageFound)
    if (storeAsFile) {
        fs.writeFileSync(
            `output-${rootPageId}.json`,
            JSON.stringify(root, null, 4)
        )
    }
    const time = (new Date().getTime() - startTime) / 1000
    console.log(`Done parsing pages in ${time}s`)
    return root
}

export default parsePages
