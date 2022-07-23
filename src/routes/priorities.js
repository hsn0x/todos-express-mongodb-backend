import { Router } from "express"
import { Priority as PriorityController } from "../controllers/index.js"
import { Auth } from "../middleware/index.js"
import { Priority as PriorityMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", PriorityController.getAll)
router.get("/:id", PriorityController.getById)
router.get("/q/:query", PriorityController.getAllBySearch)
router.get("/name/:slug", PriorityController.getByName)
router.post("/", Auth.isAuth, PriorityController.create)
router.put(
    "/:id",
    Auth.isAuth,
    PriorityMiddleware.isOwner,
    PriorityController.update
)
router.delete(
    "/:id",
    Auth.isAuth,
    PriorityMiddleware.isOwner,
    PriorityController.remove
)

export default router
