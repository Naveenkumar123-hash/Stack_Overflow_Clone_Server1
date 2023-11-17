import {signup} from "../Controllers/users.js";
import {login} from "../Controllers/users.js";
import express from "express"
import { getAllUsers } from "../Controllers/users.js";
import auth from "../Middleware/auth.js"
import { updateProfile } from "../Controllers/users.js";

const Router=express.Router();

Router.post("/signup",signup)
Router.post("/login",login)
Router.get("/getAllUsers",getAllUsers)
Router.patch("/update/:id",auth,updateProfile)
export default Router