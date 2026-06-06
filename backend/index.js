const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth.route")
const messageRoutes = require("./routes/message.route")
const { createServer } = require('http');
const cors = require("cors");
const dbConnect = require("./config/db")
const { initSocket } =require("./services/socket.js")

dotenv.config();

const app = express();

app.use(express.json())
app.use(cors());

app.use("/api", authRoutes)
app.use("/api", messageRoutes)

// const userMap = {}
// io.on('connection', (socket) => {
//     // console.log("Connected:", socket.user.fullName);
//      const userId =socket.handshake.query.userId
//      userMap[userId] = socket.id;
//     // console.log('a user connected')
//     // console.log("id", socket.id);
//     // console.log("id", socket.id.length);
//     console.log(userMap);

//     // socket.emit("event" ,`welcome to the server ,${socket.id}`)
//     // socket.broadcast.emit("welcome" ,`${socket.id} joined the server`)

//     socket.on("disconnect" ,()=>{
//         console.log("user disconnect" , socket.id); 
//     })

// });

app.get("/", (req, res) => {
    res.send("server running")
})

const server = createServer(app)
initSocket(server)

server.listen(process.env.PORT, () => {
    console.log(`server is start in port ${process.env.PORT}`);
    dbConnect()
})