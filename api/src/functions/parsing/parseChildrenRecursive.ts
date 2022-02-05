import getBlockChildren from "../../notion-api/getBlockChildren"
import { createEmptyPage, Page } from "../../types/Page"
import idToUrl from "../idToUrl"

const parseChildrenRecursive = async (pageId: string, currentPage: Page) => {
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
                await parseChildrenRecursive(page.id, newPage)
                currentPage.children.push(newPage)
        }
    }
}

export default parseChildrenRecursive
