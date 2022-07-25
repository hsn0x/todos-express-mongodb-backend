import passport from "passport"
import { Router } from "express"
import "../db/passport.js"

const router = Router()

router.use(passport.initialize())
router.use(passport.session())

router.use((req, res, next) => {
    const { session, user } = req
    // console.log(session, user);
    next()
})

export default router
