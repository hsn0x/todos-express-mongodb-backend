import { Router } from "express"
import { AuthController } from "../controllers/index.js"
import { AuthMiddleware } from "../middleware/index.js"

const router = Router()

router.post("/login", AuthMiddleware.isGuest, AuthController.login)
router.get("/me", AuthMiddleware.isAuth, AuthController.profile)

router.post(
    "/register",
    AuthMiddleware.isGuest,
    AuthMiddleware.isEmailExist,
    AuthMiddleware.isUsernameTaken,
    AuthController.register
)

router.get("/login/failure", AuthMiddleware.isGuest, (req, res, next) => {
    return res.status(401).json({
        message: "Invalid username or password",
    })
})
router.get("/login/success", AuthMiddleware.isAuth, (req, res, next) => {
    return res.status(200).json({
        message: "Login successful",
    })
})

router.get("/logout", AuthController.logout, AuthController.logoutSession)

export default router
