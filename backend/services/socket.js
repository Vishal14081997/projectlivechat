const { Server, Socket } = require("socket.io")

let io;

const userSocketMap = {}

const initSocket = async (server) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    })
}

io.on("connection", async (socket) => {
    console.log("User connected");
})

