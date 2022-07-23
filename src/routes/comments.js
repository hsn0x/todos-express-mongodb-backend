import { Router } from "express";
import {
    create,
    remove,
    getById,
    getByName,
    getAll,
    getAllBySearch,
    getAllByTaskId,
    getAllByUserId,
    update,
} from "../controllers/Comment.js";
import { isAuth } from "../middleware/Auth.js";
import { isOwner } from "../middleware/Comment.js";

const router = Router();

router.get("/:id", getById);
router.get("/name/:slug", getByName);

router.get("/", getAll);
router.get("/q/:query", getAllBySearch);
router.get("/TaskId/:id", getAllByTaskId);
router.get("/UserId/:id", getAllByUserId);

router.post("/", isAuth, create);
router.put("/:id", isAuth, isOwner, update);
router.delete("/:id", isAuth, isOwner, remove);

export default router;
