import { Router } from "express"
import { Task } from "../controllers/index.js"
import { isAuth } from "../middleware/Auth.js"
import { isOwner } from "../middleware/Task.js"

const router = Router()

router.get("/", Task.getAll)
router.get("/:id", Task.getById)
router.get("/q/:query", Task.getAllBySearch)
router.get("/name/:slug", Task.getByName)
router.get("/UserId/:id", Task.getAllByUserId)
router.post("/", isAuth, Task.create)
router.put("/:id", isAuth, isOwner, Task.update)
router.delete("/:id", isAuth, isOwner, Task.remove)

export default router
