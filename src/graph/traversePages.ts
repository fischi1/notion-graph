import dispatchNewPageEvent from "../events/NewPageEvent"
import { dispatchTraversalBegin } from "../events/TraversalBeginEvent"
import { dispatchTraversalEnd } from "../events/TraversalEndEvent"
import countPages from "../functions/countPages"
import { Page } from "../types/Page"
import { TraversalType } from "../types/TraversalType"

const traversePages = async (
    page: Page,
    traversal: TraversalType,
    sleepTime: number
) => {
    dispatchTraversalBegin({
        pageCount: countPages(page)
    })
    if (traversal === "depth-first") {
        await traverseDepthFirst(page, sleepTime)
    } else {
        await traverseBreadthFirst(page, sleepTime)
    }
    dispatchTraversalEnd()
}

type QueueItem = { page: Page; depth: number; parentId?: string }

const traverseBreadthFirst = async (root: Page, sleepTime: number) => {
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

const traverseDepthFirst = async (page: Page, sleepTime: number) => {
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

export default traversePages
