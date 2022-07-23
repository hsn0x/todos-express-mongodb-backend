import { Router } from "express"
import { ProjectController } from "../controllers/index.js"
import { AuthMiddleware } from "../middleware/index.js"
import { ProjectMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/", ProjectController.getAll)
router.get("/:id", ProjectController.getById)
router.get("/q/:query", ProjectController.getAllBySearch)
router.get("/name/:slug", ProjectController.getByName)
router.post("/", AuthMiddleware.isAuth, ProjectController.create)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    ProjectMiddleware.isOwner,
    ProjectController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    ProjectMiddleware.isOwner,
    ProjectController.remove
)

export default router
