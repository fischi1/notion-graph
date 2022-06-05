export type Page = {
    title: string
    id: string
    url: string
    children: Page[]
}

const createEmptyPage = (): Page => ({
    title: "",
    id: "",
    url: "",
    children: []
})

export { createEmptyPage }
