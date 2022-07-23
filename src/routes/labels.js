import { Router } from "express"
import { Label } from "../controllers/index.js"
import { isAuth } from "../middleware/Auth.js"
import { isOwner } from "../middleware/Label.js"

const router = Router()

router.get("/", Label.getAll)
router.get("/:id", Label.getById)
router.get("/q/:query", Label.getAllBySearch)
router.get("/name/:slug", Label.getByName)
router.post("/", isAuth, Label.create)
router.put("/:id", isAuth, isOwner, Label.update)
router.delete("/:id", isAuth, isOwner, Label.remove)

export default router
