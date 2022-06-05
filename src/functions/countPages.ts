import { Page } from "../types/Page"

const countPages = (page: Page) => {
    let pages = 0

    const countPage = (page: Page) => {
        pages++
        page.children.forEach((p) => countPage(p))
    }

    countPage(page)

    return pages
}

export default countPages
