import { Router } from "express";
import {
    createProject,
    deleteProject,
    getProjectById,
    getProjectByName,
    getProjects,
    getProjectsBySearch,
    updateProject,
} from "../controllers/Project.js";
import { isAuth } from "../middleware/Auth.js";
import { isProjectOwner } from "../middleware/Project.js";

const router = Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.get("/q/:query", getProjectsBySearch);
router.get("/name/:slug", getProjectByName);
router.post("/", isAuth, createProject);
router.put("/:id", isAuth, isProjectOwner, updateProject);
router.delete("/:id", isAuth, isProjectOwner, deleteProject);

export default router;
