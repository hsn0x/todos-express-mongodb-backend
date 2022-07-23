import { Router } from "express";
import {
    createPriority,
    deletePriority,
    getPriorityById,
    getPriorityByName,
    getPriorities,
    getPrioritiesBySearch,
    updatePriority,
} from "../controllers/Priority.js";
import { isAuth } from "../middleware/Auth.js";
import { isPriorityOwner } from "../middleware/Priority.js";

const router = Router();

router.get("/", getPriorities);
router.get("/:id", getPriorityById);
router.get("/q/:query", getPrioritiesBySearch);
router.get("/name/:slug", getPriorityByName);
router.post("/", isAuth, createPriority);
router.put("/:id", isAuth, isPriorityOwner, updatePriority);
router.delete("/:id", isAuth, isPriorityOwner, deletePriority);

export default router;
