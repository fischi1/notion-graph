import express from "express"
import { validate as uuidValidate } from "uuid"
import parsePages from "./parsePages"

const port = +(process.env.PORT ?? 3000)

const app = express()

app.get("/health", (req, res) => {
    res.send({ message: "All good!" })
})

app.post("/parse/:pageId", async (req, res) => {
    const pageId = req.params.pageId
    if (!uuidValidate(pageId)) {
        throw new Error("param not a valid uuid")
    }
    const page = await parsePages(pageId, true)
    res.send({ message: `Done parsing ${page.title}` })
})

app.listen(port, () => {
    console.log(`listening at port ${port}`)
})
