import { Router } from "express";
import {
    create,
    remove,
    getById,
    getByName,
    getAll,
    getAllBySearch,
    update,
} from "../controllers/Priority.js";
import { isAuth } from "../middleware/Auth.js";
import { isOwner } from "../middleware/Priority.js";

const router = Router();

router.get("/", getAll);
router.get("/:id", getById);
router.get("/q/:query", getAllBySearch);
router.get("/name/:slug", getByName);
router.post("/", isAuth, create);
router.put("/:id", isAuth, isOwner, update);
router.delete("/:id", isAuth, isOwner, remove);

export default router;
