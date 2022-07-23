import { Router } from "express"
import { Comment } from "../controllers/index.js"
import { isAuth } from "../middleware/Auth.js"
import { isOwner } from "../middleware/Comment.js"

const router = Router()

router.get("/:id", Comment.getById)
router.get("/name/:slug", Comment.getByName)

router.get("/", Comment.getAll)
router.get("/q/:query", Comment.getAllBySearch)
router.get("/TaskId/:id", Comment.getAllByTaskId)
router.get("/UserId/:id", Comment.getAllByUserId)

router.post("/", isAuth, Comment.create)
router.put("/:id", isAuth, isOwner, Comment.update)
router.delete("/:id", isAuth, isOwner, Comment.remove)

export default router
