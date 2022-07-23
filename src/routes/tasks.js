import { Router } from "express";
import {
    createTask,
    deleteTask,
    getTaskById,
    getTasks,
    updateTask,
    getTasksBySearch,
    getTaskByName,
    getTasksByUserId,
} from "../controllers/Task.js";
import { isAuth } from "../middleware/Auth.js";
import { isTaskOwner } from "../middleware/Task.js";

const router = Router();

router.get("/", getTasks);
router.get("/:id", getTaskById);
router.get("/q/:query", getTasksBySearch);
router.get("/name/:slug", getTaskByName);
router.get("/UserId/:id", getTasksByUserId);
router.post("/", isAuth, createTask);
router.put("/:id", isAuth, isTaskOwner, updateTask);
router.delete("/:id", isAuth, isTaskOwner, deleteTask);

export default router;
