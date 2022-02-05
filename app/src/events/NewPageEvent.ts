import { NewPageDetail } from "../../../api/src/types/NewPageDetail"

export type NewPageEvent = CustomEvent<NewPageDetail>

const dispatchNewPageEvent = (detail: NewPageDetail) => {
    document.dispatchEvent(new CustomEvent("newPage", { detail: detail }))
}

export default dispatchNewPageEvent
