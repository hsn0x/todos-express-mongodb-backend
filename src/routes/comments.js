import { Router } from "express"
import { CommentController } from "../controllers/index.js"
import { AuthMiddleware } from "../middlewares/index.js"
import { CommentMiddleware } from "../middlewares/index.js"

const router = Router()

router.get("/:id", CommentController.getById)
router.get("/name/:slug", CommentController.getByName)

router.get("/", CommentController.getAll)
router.get("/q/:query", CommentController.getAllBySearch)
router.get("/TaskId/:id", CommentController.getAllByTaskId)
router.get("/UserId/:id", CommentController.getAllByUserId)

router.post("/", AuthMiddleware.isAuth, CommentController.create)
router.put(
    "/:id",
    AuthMiddleware.isAuth,
    CommentMiddleware.isOwner,
    CommentController.update
)
router.delete(
    "/:id",
    AuthMiddleware.isAuth,
    CommentMiddleware.isOwner,
    CommentController.remove
)

export default router
