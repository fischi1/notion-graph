export type Page = {
    title: string
    id: string
    url: string
    children: Page[]
    references: string[]
}

const createEmptyPage = (): Page => ({
    title: "",
    id: "",
    url: "",
    children: [],
    references: []
})

export { createEmptyPage }
