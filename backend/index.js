const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoutes = require("./routes/auth.route")
const dbConnect = require("./config/db")
const cors = require("cors");
dotenv.config();

const app = express();
app.use(express.json())
app.use(cors({ origin: "http://localhost:5173"}));

app.use("/api" , authRoutes)

app.get("/" ,(req, res)=>{
    res.send("server running")
})
app.listen(process.env.PORT, ()=>{
    console.log(`server is start in port ${process.env.PORT}` );
    dbConnect()
})