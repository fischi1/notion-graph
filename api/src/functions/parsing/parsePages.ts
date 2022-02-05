import fs from "fs"
import getPageTitle from "../../notion-api/getPageTitle"
import { createEmptyPage } from "../../types/Page"
import idToUrl from "../idToUrl"
import parseChildrenRecursive from "./parseChildrenRecursive"

type ParsePagesSettings = {
    storeAsFile?: boolean
}

const parsePages = async (
    rootPageId: string,
    settings?: ParsePagesSettings
) => {
    const { storeAsFile } = settings ?? {}

    const root = createEmptyPage()
    root.title = (await getPageTitle(rootPageId)) ?? ""
    root.id = rootPageId
    root.url = idToUrl(rootPageId)

    const startTime = new Date().getTime()
    await parseChildrenRecursive(rootPageId, root)
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
