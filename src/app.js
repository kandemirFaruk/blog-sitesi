import express from "express"
import dotenv from "dotenv"
import conn from "./db.js"
import authRoute from "./routers/AuthRoute.js"

const app=express()
dotenv.config()
conn()
const PORT = process.env.PORT


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/auth",authRoute)

app.listen(PORT,()=>{
    console.log(`Sunucu ${PORT} portunda çalışmaya başladı.`)
})