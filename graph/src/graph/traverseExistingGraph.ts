import dispatchNewPageEvent from "../events/NewPageEvent"
import { Page } from "../notion/types/Page"

const sleepTime = 500
let traversal: "breadth-first" | "depth-first" = "breadth-first"

const traverseExistingGraph = async (page: Page) => {
    if (traversal === "depth-first") {
        traverseDepthFirst(page)
    } else {
        traverseBreadthFirst(page)
    }
}

type QueueItem = { page: Page; depth: number; parentId?: string }

const traverseBreadthFirst = async (root: Page) => {
    const queue: QueueItem[] = []
    queue.push({ page: root, depth: 0 })

    while (queue.length > 0) {
        const queueItem = queue.shift()
        if (!queueItem) return
        
        dispatchNewPageEvent({
            title: queueItem.page.title,
            id: queueItem.page.id,
            url: queueItem.page.url,
            depth: queueItem.depth,
            parentId: queueItem.parentId
        })
        await new Promise((resolve) => setTimeout(resolve, sleepTime))

        const children = queueItem.page.children.map((page) => ({
            page: page,
            depth: queueItem.depth + 1,
            parentId: queueItem.page.id
        })) as QueueItem[]
        queue.push(...children)
    }
}

const traverseDepthFirst = async (page: Page) => {
    const processPage = async (
        page: Page,
        depth: number,
        parentPage?: Page
    ) => {
        dispatchNewPageEvent({
            title: page.title,
            id: page.id,
            url: page.url,
            depth: depth,
            parentId: parentPage?.id
        })
        for (const childPage of page.children) {
            await new Promise((resolve) => setTimeout(resolve, sleepTime))
            await processPage(childPage, depth + 1, page)
        }
    }

    processPage(page, 0)
}

export default traverseExistingGraph
