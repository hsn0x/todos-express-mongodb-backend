import home from "./home.js"
import users from "./users.js"
import auth from "./auth.js"
import admin from "./admin.js"

import tasks from "./tasks.js"
import projects from "./projects.js"
import comments from "./comments.js"

import labels from "./labels.js"
import priorities from "./priorities.js"

import { AuthMiddleware } from "../middlewares/index.js"

import { Router } from "express"

const router = Router()

router.use("/", home)
router.use("/auth", auth)
router.use("/users", users)
router.use("/tasks", tasks)
router.use("/projects", projects)
router.use("/comments", comments)
router.use("/labels", labels)
router.use("/priorities", priorities)
router.use("/admin", AuthMiddleware.isAuth, AuthMiddleware.isAdmin, admin)

export default router
