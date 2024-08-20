import express from "express"
import dotenv from "dotenv"
import conn from "./db.js"
import authRoute from "./routers/AuthRoute.js"
import userRoute from "./routers/UserRoute.js"
import categoryRoute from "./routers/CategoryRoute.js"


const app=express()
dotenv.config()
conn()
const PORT = process.env.PORT


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use("/auth",authRoute)
app.use("/user",userRoute)
app.use("/category",categoryRoute)

app.listen(PORT,()=>{
    console.log(`Sunucu ${PORT} portunda çalışmaya başladı.`)
})