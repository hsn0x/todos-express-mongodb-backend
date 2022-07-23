import { Router } from "express"
import { Comment as CommentController } from "../controllers/index.js"
import { Auth } from "../middleware/index.js"
import { Comment as CommentMiddleware } from "../middleware/index.js"

const router = Router()

router.get("/:id", CommentController.getById)
router.get("/name/:slug", CommentController.getByName)

router.get("/", CommentController.getAll)
router.get("/q/:query", CommentController.getAllBySearch)
router.get("/TaskId/:id", CommentController.getAllByTaskId)
router.get("/UserId/:id", CommentController.getAllByUserId)

router.post("/", Auth.isAuth, CommentController.create)
router.put(
    "/:id",
    Auth.isAuth,
    CommentMiddleware.isOwner,
    CommentController.update
)
router.delete(
    "/:id",
    Auth.isAuth,
    CommentMiddleware.isOwner,
    CommentController.remove
)

export default router
