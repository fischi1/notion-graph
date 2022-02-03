type NewPageEventDetail = {
    title: string
    id: string
    url: string
    depth: number
    parentId?: string
}

export type NewPageEvent = CustomEvent<NewPageEventDetail>

const dispatchNewPageEvent = (detail: NewPageEventDetail) => {
    document.dispatchEvent(new CustomEvent("newPage", { detail: detail }))
}

export default dispatchNewPageEvent
