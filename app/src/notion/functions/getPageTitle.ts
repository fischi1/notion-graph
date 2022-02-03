import notion from "../notion"

const getPageTitle = async (id: string) => {
    const response = (await notion.pages.retrieve({
        page_id: id
    })) as any
    return (response?.properties?.title?.title[0]?.text?.content ?? null) as
        | string
        | null
}

export default getPageTitle
