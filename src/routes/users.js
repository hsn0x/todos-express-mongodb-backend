import { Router } from "express";
import {
    create,
    remove,
    getById,
    getByUsername,
    getAll,
    update,
    updateEmail,
    updatePassword,
} from "../controllers/User.js";
import {
    isAdmin,
    isAuth,
    isEmailExist,
    isGuest,
    isUserAuth,
    isUsernameTaken,
} from "../middleware/Auth.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.get("/username/:username", getByUsername);
router.post("/", isAuth, isAdmin, isEmailExist, isUsernameTaken, create);
router.put("/:id", isAuth, isUsernameTaken, isUserAuth, update);
router.put("/email/:id", isAuth, isEmailExist, isUserAuth, updateEmail);
router.put("/password/:id", isAuth, isUserAuth, updatePassword);
router.delete("/:id", isAuth, isUserAuth, remove);

export default router;
