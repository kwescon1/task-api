import express from "express";
import taskRoutes from "./taskRoutes.js";

// Create router instance
const router = express.Router();

router.use("/tasks", taskRoutes);

// export configured routes
export default router;
