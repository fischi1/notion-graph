import fs from "fs"
import getBlockChildren from "./functions/getBlockChildren"
import getPageTitle from "./functions/getPageTitle"
import idToUrl from "./functions/idToUrl"
import { Page } from "./types/Page"

const rootPageId = "919caf5b-50e2-4cda-8c1b-61be89e1b004"

const createEmptyPage = (): Page => ({
    title: "",
    id: "",
    url: "",
    children: [],
    references: []
})

const root = createEmptyPage()

const parseChildrenOfPage = async (pageId: string, currentPage: Page) => {
    console.log(`parsing page "${currentPage.title}": ${pageId}`)
    const blocks = await getBlockChildren(pageId)

    for (const element of blocks.results) {
        //@ts-ignore
        const type = element.type as string

        switch (type) {
            case "child_page":
                const page = element as Extract<
                    typeof element,
                    { type: "child_page" }
                >
                const newPage = createEmptyPage()
                newPage.title = page.child_page.title
                newPage.id = page.id
                newPage.url = idToUrl(page.id)
                await parseChildrenOfPage(page.id, newPage)
                currentPage.children.push(newPage)
        }
    }
}

;(async function () {
    root.title = (await getPageTitle(rootPageId)) ?? ""
    root.id = rootPageId
    root.url = idToUrl(rootPageId)

    const startTime = new Date().getTime()
    await parseChildrenOfPage(rootPageId, root)
    fs.writeFileSync("output.json", JSON.stringify(root, null, 4))
    const time = (new Date().getTime() - startTime) / 1000
    console.log(`Done parsing pages in ${time}s`)
})()
