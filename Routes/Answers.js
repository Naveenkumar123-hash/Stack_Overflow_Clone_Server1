import express from "express";
import auth from "../Middleware/auth.js"
import { PostAnswers,DeleteAnswers } from "../Controllers/Questions.js"

const Routers=express.Router();

Routers.patch("/post/:id",auth,PostAnswers)
Routers.patch("/delete/:id",auth,DeleteAnswers)


export default Routers