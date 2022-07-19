import { Router } from "express";
import { dbSeed } from "../seeders/index.js";

const router = Router();

router.get("/", async (req, res) => {
    await dbSeed();
    res.status(200).json({
        message: "Node.js, Express, and MongoDB API",
    });
});

export default router;
