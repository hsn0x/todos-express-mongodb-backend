import { Router } from "express"
import { LabelController } from "../controllers/index.js"
import { AuthMiddleware } from "../middleware/index.js"
import { LabelMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", LabelController.getAll)
router.get("/:id", LabelController.getById)
router.get("/q/:query", LabelController.getAllBySearch)
router.get("/name/:slug", LabelController.getByName)
router.post("/", AuthMiddleware.isAuth, LabelController.create)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    LabelMiddleware.isOwner,
    LabelController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    LabelMiddleware.isOwner,
    LabelController.remove
)

export default router
