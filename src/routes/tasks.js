import { Router } from "express"
import { Task as TaskController } from "../controllers/index.js"
import { Auth } from "../middleware/index.js"
import { Task as TaskMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", TaskController.getAll)
router.get("/:id", TaskController.getById)
router.get("/q/:query", TaskController.getAllBySearch)
router.get("/name/:slug", TaskController.getByName)
router.get("/UserId/:id", TaskController.getAllByUserId)
router.post("/", Auth.isAuth, TaskController.create)
router.put("/:id", Auth.isAuth, TaskMiddleware.isOwner, TaskController.update)
router.delete(
    "/:id",
    Auth.isAuth,
    TaskMiddleware.isOwner,
    TaskController.remove
)

export default router
