import { Router } from "express"
import { Project as ProjectController } from "../controllers/index.js"
import { Auth } from "../middleware/index.js"
import { Project } from "../middleware/index.js"

const router = Router()

router.get("/", ProjectController.getAll)
router.get("/:id", ProjectController.getById)
router.get("/q/:query", ProjectController.getAllBySearch)
router.get("/name/:slug", ProjectController.getByName)
router.post("/", Auth.isAuth, ProjectController.create)
router.put("/:id", Auth.isAuth, Project.isOwner, ProjectController.update)
router.delete("/:id", Auth.isAuth, Project.isOwner, ProjectController.remove)

export default router
