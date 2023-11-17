import express from "express"
import Questions from "../Controllers/Questions.js"
import { getAllquestions } from "../Controllers/Questions.js"
import { deleteQuestion,voteQuestion } from "../Controllers/Questions.js"
import auth from "../Middleware/auth.js"

const Routes=express.Router()

Routes.post("/ask",auth,Questions)
Routes.get("/get",getAllquestions)
Routes.delete("/delete/:id",auth,deleteQuestion)
Routes.patch("/vote/:id",auth,voteQuestion)

export default Routes;