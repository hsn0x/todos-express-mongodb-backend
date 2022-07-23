import { Router } from "express"
import { Project } from "../controllers/index.js"
import { isAuth } from "../middleware/Auth.js"
import { isOwner } from "../middleware/Project.js"

const router = Router()

router.get("/", Project.getAll)
router.get("/:id", Project.getById)
router.get("/q/:query", Project.getAllBySearch)
router.get("/name/:slug", Project.getByName)
router.post("/", isAuth, Project.create)
router.put("/:id", isAuth, isOwner, Project.update)
router.delete("/:id", isAuth, isOwner, Project.remove)

export default router
