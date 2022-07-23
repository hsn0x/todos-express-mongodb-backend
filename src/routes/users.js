import { Router } from "express"
import { User } from "../controllers/index.js"
import {
    isAdmin,
    isAuth,
    isEmailExist,
    isGuest,
    isUserAuth,
    isUsernameTaken,
} from "../middleware/Auth.js"

const router = Router()

router.get("/", User.getAll)
router.get("/:id", User.getById)
router.get("/username/:username", User.getByUsername)
router.post("/", isAuth, isAdmin, isEmailExist, isUsernameTaken, User.create)
router.put("/:id", isAuth, isUsernameTaken, isUserAuth, User.update)
router.put("/email/:id", isAuth, isEmailExist, isUserAuth, User.updateEmail)
router.put("/password/:id", isAuth, isUserAuth, User.updatePassword)
router.delete("/:id", isAuth, isUserAuth, User.remove)

export default router
