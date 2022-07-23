import { Router } from "express"
import { User } from "../controllers/index.js"
import { Auth } from "../middleware/index.js"

const router = Router()

router.get("/", User.getAll)
router.get("/:id", User.getById)
router.get("/username/:username", User.getByUsername)
router.post(
    "/",
    Auth.isAuth,
    Auth.isAdmin,
    Auth.isEmailExist,
    Auth.isUsernameTaken,
    User.create
)
router.put(
    "/:id",
    Auth.isAuth,
    Auth.isUsernameTaken,
    Auth.isUserAuth,
    User.update
)
router.put(
    "/email/:id",
    Auth.isAuth,
    Auth.isEmailExist,
    Auth.isUserAuth,
    User.updateEmail
)
router.put("/password/:id", Auth.isAuth, Auth.isUserAuth, User.updatePassword)
router.delete("/:id", Auth.isAuth, Auth.isUserAuth, User.remove)

export default router
