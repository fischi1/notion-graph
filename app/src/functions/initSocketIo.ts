import { io, Socket } from "socket.io-client"

let socket: Socket | null = null

const initSocketIo = () => {
    socket = io({ reconnection: false })
    console.log("socket.id", socket.id)

    socket.on("hello", console.log)
}

const getSocket = () => {
    return socket
}

export { getSocket }

export default initSocketIo
