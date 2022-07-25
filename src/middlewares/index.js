import { Router } from "express"
import bodyParser from "./BodyParser.js"
import passport from "./Passport.js"
import mongoDb from "./MongoDB.js"
import cors from "cors"

export { default as AuthMiddleware } from "./Auth.js"
export { default as CommentMiddleware } from "./Comment.js"
export { default as LabelMiddleware } from "./Label.js"
export { default as PriorityMiddleware } from "./Priority.js"
export { default as ProjectMiddleware } from "./Project.js"
export { default as TaskMiddleware } from "./Task.js"
export { default as UserMiddleware } from "./User.js"

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

export { router as middlewares }
