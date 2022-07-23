import { Router } from "express"
import { Label as LabelController } from "../controllers/index.js"
import { Auth } from "../middleware/index.js"
import { Label as LabelMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", LabelController.getAll)
router.get("/:id", LabelController.getById)
router.get("/q/:query", LabelController.getAllBySearch)
router.get("/name/:slug", LabelController.getByName)
router.post("/", Auth.isAuth, LabelController.create)
router.put("/:id", Auth.isAuth, LabelMiddleware.isOwner, LabelController.update)
router.delete(
    "/:id",
    Auth.isAuth,
    LabelMiddleware.isOwner,
    LabelController.remove
)

export default router
