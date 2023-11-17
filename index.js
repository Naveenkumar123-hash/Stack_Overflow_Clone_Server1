import express, { json, urlencoded } from "express";
import { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import Router from "./Routes/users.js";
import Routes from "./Routes/Questions.js";
import answerRoutes from "./Routes/Answers.js"

dotenv.config();
const app=express()

app.use(json({limit:"30mb",extended:true}))
app.use(urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.get("/",(req,res)=>{
    res.send({
        status:200,
        message:"This is Stack overflow clone"
    })
})

app.use("/user",Router)
app.use("/question",Routes)
app.use("/answer",answerRoutes)

connect(process.env.MANGODB_URI).then(()=>{
    console.log("MangoDb connected")
}).catch((error)=>{
    console.log(error.message)
})

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`Port is running in ${PORT}`)
})


