const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth.route")
const { createServer } = require('http');
const cors = require("cors");

const { Server } = require('socket.io');
const dbConnect = require("./config/db")

dotenv.config();

const app = express();
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        credentials: true,
        methods: ["GET", "POST"]
    }
})

app.use(express.json())
app.use(cors());

app.use("/api", authRoutes)

io.on('connection', (socket) => {
    console.log('a user connected');
    // console.log("id", socket.id);
    // console.log("id", socket.id.length);
});

app.get("/", (req, res) => {
    res.send("server running")
})
server.listen(process.env.PORT, () => {
    console.log(`server is start in port ${process.env.PORT}`);
    dbConnect()
})