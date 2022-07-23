import { Router } from "express";
import {
    createLabel,
    deleteLabel,
    getLabelById,
    getLabelByName,
    getLabels,
    getLabelsBySearch,
    updateLabel,
} from "../controllers/Label.js";
import { isAuth } from "../middleware/Auth.js";
import { isLabelOwner } from "../middleware/Label.js";

const router = Router();

router.get("/", getLabels);
router.get("/:id", getLabelById);
router.get("/q/:query", getLabelsBySearch);
router.get("/name/:slug", getLabelByName);
router.post("/", isAuth, createLabel);
router.put("/:id", isAuth, isLabelOwner, updateLabel);
router.delete("/:id", isAuth, isLabelOwner, deleteLabel);

export default router;
