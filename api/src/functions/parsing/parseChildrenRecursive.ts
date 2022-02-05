import getBlockChildren from "../../notion-api/getBlockChildren"
import { NewPageDetail } from "../../types/NewPageDetail"
import { createEmptyPage, Page } from "../../types/Page"
import idToUrl from "../idToUrl"

const parseChildrenRecursive = async (
    currentPage: Page,
    depth: number,
    onPageFound?: (pageDetail: NewPageDetail) => void
) => {
    const blocks = await getBlockChildren(currentPage.id)

    const handleNewPageFound = (
        newPage: Page,
        depth: number,
        parentId: string
    ) => {
        if (!onPageFound) return

        onPageFound({
            id: newPage.id,
            title: newPage.title,
            url: newPage.url,
            depth: depth,
            parentId: parentId
        })
    }

    for (const element of blocks.results) {
        //@ts-ignore
        const type = element.type as string

        switch (type) {
            case "child_page":
                const pageBlock = element as Extract<
                    typeof element,
                    { type: "child_page" }
                >
                const newPage = createEmptyPage()
                newPage.title = pageBlock.child_page.title
                newPage.id = pageBlock.id
                newPage.url = idToUrl(pageBlock.id)
                handleNewPageFound(newPage, depth + 1, currentPage.id)
                await parseChildrenRecursive(newPage, depth + 1, onPageFound)
                currentPage.children.push(newPage)
        }
    }
}

export default parseChildrenRecursive
