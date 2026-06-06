const { Server, Socket } = require("socket.io")
const socketAuth = require("../middleware/socket.auth.middleware")

let io;

const userSocketMap = {}

const initSocket = async (server) => {
    io = new Server(server, {
        cors: {
            origin: "*"
        }
    })
    io.use(socketAuth)
    io.on("connection", async (socket) => {
        console.log("User connected", socket.user.fullName);
        const userId = socket.userId
        userSocketMap[userId] = socket.id
        console.log(userSocketMap);
        io.emit("OnlineUsers", Object.keys(userSocketMap));
    })
}
const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO not initialized!");
    }
    return io;
};
module.exports = {
    initSocket,
    getIO,
    userSocketMap,
};