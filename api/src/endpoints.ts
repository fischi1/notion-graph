import cors from "cors"
import express from "express"
import { Server, Socket } from "socket.io"
import { validate as uuidValidate } from "uuid"
import parsePages from "./functions/parsing/parsePages"

const port = +(process.env.PORT ?? 3001)

const app = express()
app.use(cors())
const io = new Server()

// --------------------------------------------
const router = express.Router()

const sockets: Record<string, Socket> = {}

router.get("/health", (req, res) => {
    res.send({ message: "All good!" })
})

router.post("/parse/:pageId", async (req, res) => {
    const pageId = req.params.pageId
    if (!uuidValidate(pageId)) {
        throw new Error("param not a valid uuid")
    }
    const page = await parsePages(pageId, {
        storeAsFile: true,
        onPageFound: (pageDetail) => console.log(pageDetail)
    })
    res.send({ message: `Done parsing ${page.title}` })
})

io.on("connection", (socket) => {
    console.log(`client '${socket.id}' connected`)
    sockets[socket.id] = socket

    socket.emit("hello", {
        message: "Connected",
        time: new Date()
    })

    socket.on("startParsing", async ({ pageId }) => {
        console.log(`starting parsing for ${socket.id}`)
        await parsePages(pageId, {
            onPageFound: (pageDetail) =>
                socket.emit("newPage", { newPage: pageDetail })
        })

        socket.emit("doneParsing")
    })

    socket.on("disconnect", () => {
        console.log(`client '${socket.id}' disconnected!`)
        delete sockets[socket.id]
    })
})

app.use("/api", router)

// --------------------------------------------
const expressServer = app.listen(port, () => {
    console.log(`listening at port ${port}`)
})

io.listen(expressServer)
