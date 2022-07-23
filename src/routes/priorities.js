import { Router } from "express"
import { Priority } from "../controllers/index.js"
import { isAuth } from "../middleware/Auth.js"
import { isOwner } from "../middleware/Priority.js"

const router = Router()

router.get("/", Priority.getAll)
router.get("/:id", Priority.getById)
router.get("/q/:query", Priority.getAllBySearch)
router.get("/name/:slug", Priority.getByName)
router.post("/", isAuth, Priority.create)
router.put("/:id", isAuth, isOwner, Priority.update)
router.delete("/:id", isAuth, isOwner, Priority.remove)

export default router
