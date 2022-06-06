type NewPageDetail = {
    title: string
    id: string
    url: string
    depth: number
    parentId?: string
}

export type NewPageEvent = CustomEvent<NewPageDetail>

const eventType = "newPage"

const dispatchNewPage = (detail: NewPageDetail) => {
    document.dispatchEvent(new CustomEvent(eventType, { detail: detail }))
}

const addNewPageListener = (onNewPage: (event: NewPageEvent) => void) => {
    document.addEventListener(eventType, onNewPage as any)
}

const removeNewPageListener = (onNewPage: (event: NewPageEvent) => void) => {
    document.removeEventListener(eventType, onNewPage as any)
}

export { dispatchNewPage, addNewPageListener, removeNewPageListener }
