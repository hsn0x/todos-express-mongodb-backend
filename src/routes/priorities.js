import { Router } from "express"
import { PriorityController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"
import { PriorityMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/", PriorityController.getAll)
router.get("/:id", PriorityController.getById)
router.get("/q/:query", PriorityController.getAllBySearch)
router.get("/name/:slug", PriorityController.getByName)
router.post("/", AuthMiddleware.isAuth, PriorityController.create)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    PriorityMiddleware.isOwner,
    PriorityController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    PriorityMiddleware.isOwner,
    PriorityController.remove
)

export default router
