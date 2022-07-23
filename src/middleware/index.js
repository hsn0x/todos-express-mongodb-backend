import { Router } from "express"
import bodyParser from "./BodyParser.js"
import passport from "./Passport.js"
import mongoDb from "./MongoDB.js"
import cors from "cors"

import Auth from "./Auth.js"
import Comment from "./Comment.js"
import Label from "./Label.js"
import Priority from "./Priority.js"
import Project from "./Project.js"
import Task from "./Task.js"
import User from "./User.js"

const router = Router()

const corsConfig = {
    origin: true,
    credentials: true,
}

router.use(cors(corsConfig))
router.options("*", cors(corsConfig))
router.use(mongoDb)
router.use(bodyParser)
router.use(passport)

export {
    Auth,
    Comment,
    Label,
    Priority,
    Project,
    Task,
    User,
    router as middlewares,
}
