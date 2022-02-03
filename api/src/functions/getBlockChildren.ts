import notion from "../notion"

const getBlockChildren = async (id: string) => {
    const response = await notion.blocks.children.list({
        block_id: id,
        page_size: 100
    })
    return response
}

export default getBlockChildren
