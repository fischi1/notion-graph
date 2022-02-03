export type Page = {
    title: string
    id: string,
    url: string,
    children: Page[],
    references: string[],
}
