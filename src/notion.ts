import { Client } from "@notionhq/client"

//Some types are unusable
//https://github.com/makenotion/notion-sdk-js/issues/219

const notion = new Client({
    auth: process.env.API_TOKEN
})

export default notion
