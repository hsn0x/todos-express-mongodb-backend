import { Router } from "express";
import {
    create,
    remove,
    getById,
    getAll,
    update,
    getAllBySearch,
    getByName,
    getAllByUserId,
} from "../controllers/Task.js";
import { isAuth } from "../middleware/Auth.js";
import { isOwner } from "../middleware/Task.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.get("/q/:query", getAllBySearch);
router.get("/name/:slug", getByName);
router.get("/UserId/:id", getAllByUserId);
router.post("/", isAuth, create);
router.put("/:id", isAuth, isOwner, update);
router.delete("/:id", isAuth, isOwner, remove);

export default router;
