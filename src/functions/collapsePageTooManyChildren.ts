import { Page } from "../types/Page"

const collapsePageTooManyChildren = (page: Page, maxChildren: number) => {
    if (page.children.length > maxChildren) {
        console.log("collapsing", page)
        page.children.length = 0
    } else {
        page.children.forEach((childPage) =>
            collapsePageTooManyChildren(childPage, maxChildren)
        )
    }
}

export default collapsePageTooManyChildren
