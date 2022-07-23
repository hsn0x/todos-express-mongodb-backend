/**
 * @description - Import routes for the application.
 */
import home from "./home.js";
import users from "./users.js";
import auth from "./auth.js";
import admin from "./admin.js";

import tasks from "./tasks.js";
import projects from "./projects.js";
import comments from "./comments.js";

import labels from "./labels.js";
import priorities from "./priorities.js";

/**
 * import Middleware for the application.
 */
import { isAdmin, isAuth } from "../middleware/Auth.js";

/**
 * @description - Import router for the application.
 */
import { Router } from "express";

/**
 * @description - Create a new router for the application.
 */
const router = Router();

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
/**
 * @description - Routes for the application.
 */
router.use("/", home);
router.use("/auth", auth);
router.use("/users", users);
router.use("/tasks", tasks);
router.use("/projects", projects);
router.use("/comments", comments);
router.use("/labels", labels);
router.use("/priorities", priorities);
router.use("/admin", isAuth, isAdmin, admin);

export default router;
