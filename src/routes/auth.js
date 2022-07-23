import { Router } from "express"
import { Auth } from "../controllers/index.js"
import {
    isAuth,
    isEmailExist,
    isGuest,
    isUsernameTaken,
} from "../middleware/Auth.js"

const router = Router()

router.post("/login", isGuest, Auth.login)
router.get("/me", isAuth, Auth.profile)

router.post("/register", isGuest, isEmailExist, isUsernameTaken, Auth.register)

router.get("/login/failure", isGuest, (req, res, next) => {
    return res.status(401).json({
        message: "Invalid username or password",
    })
})
router.get("/login/success", isAuth, (req, res, next) => {
    return res.status(200).json({
        message: "Login successful",
    })
})

router.get("/logout", Auth.logout, Auth.logoutSession)

export default router
