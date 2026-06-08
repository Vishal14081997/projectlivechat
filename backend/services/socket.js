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
        socket.join(userId.toString())
        console.log("joined room:",userId.toString());
        socket.on("disconnect", () => {
            delete userSocketMap[userId];
            console.log(`User ${userId} disconnected.`);
            io.emit("OnlineUsers", Object.keys(userSocketMap));
        })
    })
    return io
}
console.log("socket all user",userSocketMap);

const getIO = () => {
    return io;
};
module.exports = {
    initSocket,
    getIO,
    userSocketMap,
};