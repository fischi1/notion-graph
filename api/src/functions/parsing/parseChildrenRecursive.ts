import getBlockChildren from "../../notion-api/getBlockChildren"
import { NewPageDetail } from "../../types/NewPageDetail"
import { createEmptyPage, Page } from "../../types/Page"
import idToUrl from "../idToUrl"

const parseChildrenRecursive = async (
    currentBlockId: string,
    currentPage: Page,
    depth: number,
    onPageFound?: (pageDetail: NewPageDetail) => void
) => {
    const blocks = await getBlockChildren(currentBlockId)

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
                currentPage.children.push(newPage)
                await parseChildrenRecursive(
                    newPage.id,
                    newPage,
                    depth + 1,
                    onPageFound
                )
                break

            case "toggle":
                const toggleBlock = element as Extract<
                    typeof element,
                    { type: "toggle" }
                >
                await parseChildrenRecursive(
                    toggleBlock.id,
                    currentPage,
                    depth,
                    onPageFound
                )
                break

            case "callout":
                const calloutBlock = element as Extract<
                    typeof element,
                    { type: "callout" }
                >
                await parseChildrenRecursive(
                    calloutBlock.id,
                    currentPage,
                    depth,
                    onPageFound
                )
                break

            case "bulleted_list_item":
                const bulletedListBlock = element as Extract<
                    typeof element,
                    { type: "bulleted_list_item" }
                >
                await parseChildrenRecursive(
                    bulletedListBlock.id,
                    currentPage,
                    depth,
                    onPageFound
                )
                break

            case "numbered_list_item":
                const numberedListBlock = element as Extract<
                    typeof element,
                    { type: "numbered_list_item" }
                >
                await parseChildrenRecursive(
                    numberedListBlock.id,
                    currentPage,
                    depth,
                    onPageFound
                )
                break
        }
    }
}

export default parseChildrenRecursive
