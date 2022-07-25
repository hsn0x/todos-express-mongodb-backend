import { Router } from "express"
import { TaskController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"
import { TaskMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/", TaskController.getAll)
router.get("/:id", TaskController.getById)
router.get("/q/:query", TaskController.getAllBySearch)
router.get("/name/:slug", TaskController.getByName)
router.get("/UserId/:id", TaskController.getAllByUserId)
router.post("/", AuthMiddleware.isAuth, TaskController.create)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    TaskMiddleware.isOwner,
    TaskController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    TaskMiddleware.isOwner,
    TaskController.remove
)

export default router
